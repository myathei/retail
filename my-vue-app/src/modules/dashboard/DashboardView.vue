<script setup lang="ts">
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import { fetchProducts } from "@/api/product-list/queries";
import { fetchSaleReport } from "@/api/sale-report/queries";
import { useCartStore } from "@/api/cart-list/useCartStore";
import { computed } from "vue";
import {
  Clipboard,
  CreditCard,
  Receipt,
  ShoppingBag,
  ShoppingCart,
} from "lucide-vue-next";

// Fetch products
const { data: productData } = fetchProducts.useQuery();
const countedData = computed(() => {
  return Array.isArray(productData?.value) ? productData.value.length : 0;
});

// Fetch sales report
const { data: saleData } = fetchSaleReport.useQuery();
const countSale = computed(() => {
  return Array.isArray(saleData?.value) ? saleData.value.length : 0;
});

// Cart store
const cartStore = useCartStore();
</script>

<template>
  <h1 class="p-3 mx-8 font-bold">Dashboard</h1>
  <div class="p-3 flex flex-wrap gap-4 mx-8 ">
    <!-- Product Card -->
    <RouterLink to="/product">
      <Card class="text-muted-foreground transition-all hover:text-primary">
        <CardContent class="text-center flex flex-col items-center w-60 bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 class="font-bold text-xl flex items-center justify-center mb-2">
            <span><ShoppingBag class="h-8 w-8 mr-1" /></span>
            Total Product
          </h2>
          <p>{{ countedData }}</p>
        </CardContent>
      </Card>
    </RouterLink>

    <!-- Cart Card -->
    <RouterLink to="/cart">
      <Card class="text-muted-foreground transition-all hover:text-primary">
        <CardContent class="text-center flex flex-col items-center w-60 bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 class="font-bold text-xl flex items-center justify-center mb-2">
            <ShoppingCart class="h-8 w-8 font-bold mr-1" />
            Total Cart
          </h2>
          <p>{{ cartStore.countCartItems }}</p>
        </CardContent>
      </Card>
    </RouterLink>

    <!-- Cashier Card -->
    <RouterLink to="/cashier">
      <Card class="text-muted-foreground transition-all hover:text-primary">
        <CardContent class="text-center flex flex-col items-center w-60 bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 class="font-bold text-xl flex items-center justify-center mb-2">
            <CreditCard class="h-8 w-8 mr-1" />
            Cashier
          </h2>
          <p>Total Order: {{ cartStore.countCartItems }}</p>
        </CardContent>
      </Card>
    </RouterLink>

    <!-- Sale Report Card -->
    <RouterLink to="/manager/sale-report">
      <Card class="text-muted-foreground transition-all hover:text-primary">
        <CardContent class="text-center flex flex-col items-center w-60 bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 class="font-bold text-xl flex items-center justify-center mb-2">
            <Receipt class="h-8 w-8 mr-1" />
            Total Sale Report
          </h2>
          <p>{{ countSale }}</p>
        </CardContent>
      </Card>
    </RouterLink>

    <!-- Summary Report Card -->
    <RouterLink to="/manager/summary-report">
      <Card class="text-muted-foreground transition-all hover:text-primary">
        <CardContent class="text-center flex flex-col items-center w-60 bg-gray-100 p-5 rounded-lg shadow-md">
          <h2 class="font-bold text-xl flex items-center justify-center mb-2">
            <Clipboard class="h-8 w-8 mr-1" />
            Report <br/> Summary
          </h2>
        </CardContent>
      </Card>
    </RouterLink>
  </div>
</template>
