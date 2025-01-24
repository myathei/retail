<script lang="ts" setup>
import { fetchProducts } from "@/api/product-list/queries";
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
import { ref } from "vue";
import ProductDataTable from "./product-datatable/ProductDataTable.vue";
import productDialog from "./chunks/productDialog.vue";
import { ShoppingCart, PlusIcon } from "lucide-vue-next";
import Button from "@/components/ui/button/Button.vue";
import { useCartStore } from "@/api/cart-list/useCartStore";
import type { ProductType } from "@/api/product-list/types";

const columnFilters = ref<ColumnFiltersState>([]);
const sorting = ref<SortingState>([]);
const item = useCartStore();
const { data, isLoading } = fetchProducts.useQuery();


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

// Manage dialog states
const isEdit = ref(false);
const isOpen = ref(false);
const updateProduct = ref<ProductType>();

// Open dialog for adding a new product
const openAddProductDialog = () => {
  isEdit.value = false;
  isOpen.value = true;
  updateProduct.value = undefined;
};

// Close the product dialog
const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = undefined;
};

</script>

<template>
  <div class="p-4 space-y-3">
    <h1 class="text-xl font-bold">Products' List!</h1>

    <section class="bg-white rounded">
      <div class="flex justify-between">
        <Input
          class="max-w-sm p-2 border rounded-md"
          placeholder="Filter product name..."
          :model-value="table.getColumn('productName')?.getFilterValue() as string"
          @update:model-value="
            table.getColumn('productName')?.setFilterValue($event)
          "
        />
        <div class="flex justify-between items-center gap-3">
        <RouterLink
          to="/cart"
          class="relative flex items-center gap-1 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4 text-yellow-700"
        >
          <!-- Badge for item count -->
          <div
            v-if="item.countCartItems > 0"
            class="absolute top-0 right-0 bg-red-600 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center"
          >
            {{ item.countCartItems }}
          </div>
          <ShoppingCart class="h-8 w-8 font-bold" />
        </RouterLink>
        <Button variant="secondary" @click="openAddProductDialog"
          ><PlusIcon class="h-4 w-4" /> New Product</Button
        >
      </div>


      </div>

      <ProductDataTable
        :table="table"
        :loading="isLoading"
      ></ProductDataTable>
    </section>
    <productDialog
        :isOpen="isOpen"
        :isEdit="isEdit"
        :product="updateProduct"
        :close="closeDialog"
      />
  </div>
</template>
