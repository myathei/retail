<script lang="ts" setup>
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Button from "@/components/ui/button/Button.vue";
import { useCartStore } from "@/api/cart-list/useCartStore";
import { ArrowBigLeft, BackpackIcon, BellPlus, MinusIcon, Plus, PlusIcon, Trash2 } from "lucide-vue-next";
import { RouterLink } from "vue-router";
import { useToast } from "@/components/ui/toast";

export interface Product {
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
}
const cartStore = useCartStore();
const {toast} = useToast();

// Remove product from cart
const removeFromCart = (product: Product) => {
  toast({
        description: product.productName + ' Remove Successfull!',
        duration: 1000,
      });
  cartStore.removeProductFromCart(product);
};

// Increment product quantity
const incrementQuantity = (product: Product) => {
  const cartItem = cartStore.cartItems.find(
    (item) => item.product.productID === product.productID
  );
  if (cartItem && cartItem.quantity < product.stock) {
    cartStore.updateQuantity(product, cartItem.quantity + 1);
  }
};

// Decrement product quantity
const decrementQuantity = (product: Product) => {
  const cartItem = cartStore.cartItems.find(
    (item) => item.product.productID === product.productID
  );
  if (cartItem && cartItem.quantity > 1) {
    cartStore.updateQuantity(product, cartItem.quantity - 1);
  }
};
</script>

<template>
  <div class="p-3 space-y-3">
    
    <h3 class="italic py-2">Cart Items</h3>
   <RouterLink to = '/product'>
    <button class="bg-blue-300 border rounded-md py-2 px-2"><ArrowBigLeft class="w-4 h-4"/></button>
   </RouterLink>
    <div v-if="cartStore.cartItems.length > 0" class="border rounded-md">
      <Table>
        <TableHeader class="bg-pink-100 font-bold">
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Price</TableCell>
            <TableCell>Action</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(item, index) in cartStore.cartItems"
            :key="item.product.productID"
          >
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ item.product.productName }}</TableCell>
            <TableCell class="flex items-center gap-2">
              <Button
                variant="outline"
                class="px-2 py-1"
                @click="decrementQuantity(item.product)"
                :disabled="item.quantity === 1"
              >
                <MinusIcon class="w-4 h-4"/>
              </Button>
              <span>{{ item.quantity }}</span>
              <Button
                variant="outline"
                class="px-2 py-1"
                @click="incrementQuantity(item.product)"
                :disabled="item.quantity === item.product.stock"
              >
              <Plus class="h-4 w-4" />
              </Button>
            </TableCell>
            <TableCell>${{ item.product.sellingPrice.toFixed(2) }}</TableCell>
            <TableCell
              >${{
                (item.product.sellingPrice * item.quantity).toFixed(2)
              }}</TableCell
            >
            <TableCell>
              <Button
                variant="destructive"
                class="flex items-center gap-2"
                @click="removeFromCart(item.product)"
              >
                <Trash2 class="h-4 w-4" /> Remove
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>

    <!-- Empty Cart Message -->
    <div
      v-else
      class="text-center py-10 space-y-4 border rounded-md bg-gray-50"
    >
      <p class="text-xl font-semibold text-gray-600">Your cart is empty!</p>
      <Button variant="secondary" as="a" href="/product" class="px-6 py-2">
        Browse Products
      </Button>
    </div>

    <!-- Total Price Section -->
    <div
      v-if="cartStore.cartItems.length > 0"
      class="flex justify-between items-center pt-4"
    >
      <p class="text-lg font-bold">
        Total: ${{ cartStore.totalCartPrice.toFixed(2) }}
      </p>
      <RouterLink to="/cashier"><Button variant="secondary" class="px-6 py-2">Cashier</Button></RouterLink>
    </div>
  </div>
</template>
