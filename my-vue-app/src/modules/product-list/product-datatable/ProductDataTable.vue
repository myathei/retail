<script setup lang="ts" generic="TData">
import type { Table as TableType } from "@tanstack/vue-table";
import type { ProductType } from "@/api/product-list/types";
import { FlexRender } from "@tanstack/vue-table";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from '@/components/ui/button/Button.vue'
import { ref } from "vue";
import productDialog from "../chunks/productDialog.vue";

const sortModel = defineModel("sortModel", { type: Number });

const props = defineProps<{
  table: TableType<TData>;
  title?: string;
  loading: boolean;
}>();

// Manage dialog states
const isEdit = ref(false);
const isOpen = ref(false);
const updateProduct = ref<ProductType>();

// Close the product dialog
const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = undefined;
};

</script>

<template>
  <div class="py-4">
    
    <div class="rounded-md border">
      <Table>
        <TableHeader class="px-4 py-2 bg-teal-100">
          <TableRow
            v-for="headerGroup in table.getHeaderGroups()"
            :key="headerGroup.id"
          >
            <TableHead
              class="text-dark font-bold"
              v-for="header in headerGroup.headers"
              :key="header.id"
            >
              <FlexRender
                v-if="!header.isPlaceholder"
                :render="header.column.columnDef.header"
                :props="header.getContext()"
              />
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <template v-if="table.getRowModel().rows?.length">
            <template v-for="row in table.getRowModel().rows" :key="row.id">
              <TableRow :data-state="row.getIsSelected() && 'selected'">
                <TableCell v-for="cell in row.getVisibleCells()" :key="cell.id">
                  <FlexRender
                    :render="cell.column.columnDef.cell"
                    :props="cell.getContext()"
                  />
                </TableCell>
              </TableRow>
              <TableRow v-if="row.getIsExpanded()">
                <TableCell :colspan="row.getAllCells().length">
                  {{ JSON.stringify(row.original) }}
                </TableCell>
              </TableRow>
            </template>
          </template>

          <TableRow v-else>
            <TableCell
              :colspan="props.table.getAllColumns().length"
              class="h-24 text-center"
            >
              No results.
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <productDialog
  :isOpen="isOpen"
  :isEdit="isEdit"
  :product="updateProduct"
  :close="closeDialog"
/>

    </div>

    <div class="flex items-center justify-end space-x-2 py-4">
      <div class="flex-1 text-sm text-muted-foreground">
        {{ table.getFilteredSelectedRowModel().rows.length }} of
        {{ table.getFilteredRowModel().rows.length }} row(s) selected.
      </div>
      <div class="space-x-2">
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage"
          @click="table.previousPage()"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          :disabled="!table.getCanNextPage"
          @click="table.nextPage()"
        >
          Next
        </Button>
      </div>
    </div>
    
  </div>
</template>

<style>
.no-hover:hover {
  background-color: transparent !important; /* Ensure no background color change */
  color: inherit !important; /* Ensure text color doesn't change */
}
</style>
