<script lang="ts" setup>
import { fetchSaleReport } from "@/api/sale-report/queries";
import { useTable } from "@/composable/useTable";
import { columns, columnVisibility } from "./columns/column";
import { Input } from "@/components/ui/input";
import type { ColumnFiltersState, SortingState } from "@tanstack/vue-table";
import {
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
} from "@tanstack/vue-table";
import { valueUpdater } from "@/utils";
import { ref, watch } from "vue";
import SaleReportDataTable from "./data-tabel/SaleReportDataTable.vue";

const columnFilters = ref<ColumnFiltersState>([]);
const sorting = ref<SortingState>([]);

const { data, isLoading } = fetchSaleReport.useQuery();

// Initialize the table with sorting
const { table } = useTable(data, columns, columnVisibility, {
  onColumnFiltersChange: (updaterOrValue) =>
    valueUpdater(updaterOrValue, columnFilters),
  onSortingChange: (updaterOrValue) => valueUpdater(updaterOrValue, sorting),
  getFilteredRowModel: getFilteredRowModel(),
  getSortedRowModel: getSortedRowModel(),
  getPaginationRowModel: getPaginationRowModel(),
  state: {
    get columnFilters() {
      return columnFilters.value;
    },
    get sorting() {
      return sorting.value;
    },
  },
});

// Debugging: Watch sorting state
// watch(sorting, (newSorting) => {
//     console.log('Sorting state:', newSorting)
// })
</script>

<template>
  <div class="p-4 space-y-3">
    <h1 class="text-xl font-bold">Sale Report List!</h1>

    <section class="bg-white rounded">
      <div class="flex justify-start">
        <Input
          class="max-w-sm p-2 border rounded-md"
          placeholder="Filter product name..."
          :model-value="table.getColumn('productName')?.getFilterValue() as string"
          @update:model-value="
            table.getColumn('productName')?.setFilterValue($event)
          "
        />
      </div>

      <SaleReportDataTable
        :table="table"
        :loading="isLoading"
      ></SaleReportDataTable>
    </section>
  </div>
</template>
