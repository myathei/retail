<script setup lang="ts">
import { Table, TableHeader, TableCell, TableRow } from "@/components/ui/table";

import { computed } from "vue";
import { fetchSaleReport } from "@/api/sale-report/queries";

// Fetch data using fetchSaleReport query
const { data: salesData } = fetchSaleReport.useQuery();

// Computed properties to calculate totals
const totalRevenue = computed(() => {
  return salesData?.value?.reduce((sum, item) => sum + item.totalPrice, 0) || 0;
});

const totalProfit = computed(() => {
  return (
    salesData?.value?.reduce((sum, item) => sum + item.totalProfit, 0) || 0
  );
});

const total = computed(() => totalRevenue.value + totalProfit.value);

const totalQuantity = computed(() => {
  return (
    salesData.value?.reduce((sum, item) => sum + item.totalQuantity, 0) || 0
  );
});
</script>

<template>
  <div class="flex items-top justify-center h-screen bg-gray-100">
    <div class="p-4 space-y-3">
      <h2 class="w-96 font-bold text-xl font-black text-center">
        Summary Report
      </h2>
      <div class="border rounded-md w-96">
        <Table class="table-auto border-collapse border bg-teal-100">
          <TableHeader class="border-b">
            <TableRow>
              <TableCell class="font-bold border-r border-gray-300"
                >Total Quantity</TableCell
              >
              <TableCell>{{ totalQuantity }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-bold border-r border-gray-300"
                >Total Revenue</TableCell
              >
              <TableCell>{{ totalRevenue }}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell class="font-bold border-r border-gray-300"
                >Total Profit</TableCell
              >
              <TableCell>{{ totalProfit }}</TableCell>
            </TableRow>
            <TableRow class="font-bold">
              <TableCell class="font-bold border-r border-gray-300"
                >Total</TableCell
              >
              <TableCell>{{ total }}</TableCell>
            </TableRow>
          </TableHeader>
        </Table>
      </div>
    </div>
  </div>
</template>
