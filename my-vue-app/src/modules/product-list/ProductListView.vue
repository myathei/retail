<script lang="ts" setup>
import Button from "@/components/ui/button/Button.vue";
import {
  Pagination,
  PaginationFirst,
  PaginationLast,
  PaginationList,
  PaginationListItem,
  PaginationNext,
  PaginationPrev,
} from "@/components/ui/pagination";

import {
  Table,
  TableBody,
  TableCell,
  TableRow,
  TableHeader,
} from "@/components/ui/table";

import {
  Edit,
  Minus,
  PencilLine,
  PlusIcon,
  ShoppingCart,
  Trash2,
} from "lucide-vue-next";

import { fetchProducts } from "@/api/product-list/queries";
import { useCartStore } from "../../api/cart-list/useCartStore";
import { RouterLink } from "vue-router";
import { ref, computed, watch } from "vue";
import { addSale } from "@/api/sale-report/queries";
import productDialog from "./chunks/productDialog.vue";
import { deletProduct } from "@/api/product-list/queries";
import { useToast } from "@/components/ui/toast";
import type { ProductType } from "@/api/product-list/types";
// import editProduct from "./chunks/editProduct.vue";

interface Product {
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
}


// Fetch products from the server
const { data, refetch } = fetchProducts.useQuery(); // Use refetch to refresh data
const item = useCartStore();
const { mutate: add } = addSale.useMutation();
const { mutate: del } = deletProduct.useMutation();
// const { mutate: upt } = editProduct.useMutation();

const { toast } = useToast();
// Pagination state
const currentPage = ref(1);
const itemsPerPage = 7;

// Compute paginated data
const paginatedData = computed(() => {
  const products = data?.value || [];
  if (!Array.isArray(products)) return [];
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return products.slice(start, end);
});

const totalPages = computed(() => {
  const products = data?.value || [];
  return Array.isArray(products)
    ? Math.ceil(products.length / itemsPerPage)
    : 1;
});

// Pagination controls
const goToPage = (page: number) => {
  if (page >= 1 && page <= totalPages.value) {
    currentPage.value = page;
  }
};
watch(paginatedData, (newData) => {
  console.log("Paginated data:", newData);
});
const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

// Cart actions
const addToCart = (product: Product) => {
  toast({
    description: product.productName + " Add Successfull!",
    duration: 1000,
  });

  item.addProductToCart(product);
};

const removeFromCart = (product: Product) => {
  toast({
    description: product.productName + " remove Successfull!",
    duration: 1000,
  });
  item.removeProductFromCart(product);
};

const deleteProduct = (values: any) => {
  const confirm = window.confirm("Are you sure want to delete this product");
  if (confirm) {
    toast({
      description: "delete successfully",
      duration: 1000,
    });
    del(values);
  }
};

// add and update product dialog
const isEdit = ref(false);
const isOpen = ref(false);
const updateProduct = ref<ProductType>();

const openAddProductDialog = () => {
  isEdit.value = false;
  isOpen.value = true;
  updateProduct.value = undefined;
};

const openEditDialog = (product: ProductType) => {
  isOpen.value = true;
  isEdit.value = true;
  updateProduct.value = product;
};

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = undefined;
};



</script>

<template>
  <div class="p-3 space-y-3 mx-8">
    <h3 class="italic py-3 font-bold text-xl px-2 mt-0">
      Welcome to the Product List!
    </h3>
    <div class="flex justify-between items-center">
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
      <Button
            class="bg-blue-400 hover:bg-blue-500"
            @click="openAddProductDialog"
            >Add New Product</Button
          >
    </div>

    <!-- Product List -->
    <div class="border rounded-md w-auto">
      <Table>
        <TableHeader class="bg-pink-100 font-bold">
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Stock</TableCell>
            <TableCell>Selling Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(product, index) in paginatedData"
            :key="product.productID"
          >
            <TableCell>{{
              (currentPage - 1) * itemsPerPage + index + 1
            }}</TableCell>
            <TableCell>{{ product.productName }}</TableCell>
            <TableCell>{{ product.stock }}</TableCell>
            <TableCell>{{ product.sellingPrice }}</TableCell>
            <TableCell class="flex items-center gap-2">
              <Button class="bg-gray-700" @click="addToCart(product)">
                <PlusIcon class="h-3 w-3" /> Add To Cart
              </Button>
              <Button @click="removeFromCart(product)">
                <Trash2 class="h-3 w-3" /> Remove From Cart
              </Button>
              <Button variant="destructive" @click="deleteProduct(product)"
                ><Trash2 class="h-3 w-3" />
              </Button>
              <Button variant="secondary"
                >
                  <Button variant="outline" @click = "openEditDialog"
                    ><Edit class="w-4 h-4" /> Product</Button
                  >
              </Button> 
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Pagination -->
    <Pagination class="justify-items-end">
      <PaginationList class="flex items-center gap-1">
        <PaginationFirst @click="goToPage(1)" />
        <PaginationPrev @click="prevPage" />
        <template v-for="page in totalPages" :key="page">
          <PaginationListItem :value="page" as-child>
            <Button
              class="w-10 h-10 p-0"
              :variant="page === currentPage ? 'default' : 'outline'"
              @click="goToPage(page)"
            >
              {{ page }}
            </Button>
          </PaginationListItem>
        </template>
        <PaginationNext @click="nextPage" />
        <PaginationLast @click="goToPage(totalPages)" />
      </PaginationList>
    </Pagination>
  </div>
</template>
