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
import { useRouter } from "vue-router";
import { storeToRefs } from "pinia";
import { addSale } from "@/api/sale-report/queries";
import { useToast } from "@/components/ui/toast";
import { fetchProducts } from "@/api/product-list/queries";

// Cart store
const cartStore = useCartStore();

const router = useRouter();
const { toast } = useToast();
const { data } = fetchProducts.useQuery();

// Access cart items using storeToRefs for reactivity
const { cartItems } = storeToRefs(cartStore);

// Mutate save sale using addSale mutation
const { mutate: save } = addSale.useMutation();

// Confirm Order Method
const confirm = () => {
  const saleData = [];
  try {
    // Iterate over cart items and process each sale
    for (const item of cartItems.value) {
      saleData.push({
        productID: item.product.productID,
        quantity: item.quantity,
      });

      // Call the mutation to process the sale
      save(saleData);
    }

    // Clear the cart after the sale is processed
    cartStore.clearCart();

    router.push("/product").then(() => {
      data.value;
    });

    toast({
      description: "Order confirm Successful!",
      duration: 1000,
    });
  } catch (error) {
    console.error("Order confirmation failed:", error);
    alert("There was an error confirming your order.");
  }
};
</script>
<template>
  <div class="p-3 space-y-3">
    <h3 class="italic py-2">Order Items</h3>
    <div v-if="cartStore.cartItems.length > 0" class="border rounded-md">
      <Table>
        <TableHeader class="bg-pink-100 font-bold">
          <TableRow>
            <TableCell>No.</TableCell>
            <TableCell>Name</TableCell>
            <TableCell>Quantity</TableCell>
            <TableCell>Unit Price</TableCell>
            <TableCell>Total Price</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow
            v-for="(item, index) in cartStore.cartItems"
            :key="item.product.productID"
          >
            <TableCell>{{ index + 1 }}</TableCell>
            <TableCell>{{ item.product.productName }}</TableCell>
            <TableCell>{{ item.quantity }}</TableCell>
            <TableCell>${{ item.product.sellingPrice.toFixed(2) }}</TableCell>
            <TableCell>
              ${{ (item.product.sellingPrice * item.quantity).toFixed(2) }}
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
      <p class="text-xl font-semibold text-gray-600">Your order is empty!</p>
    </div>

    <!-- Total Price Section -->
    <div
      v-if="cartStore.cartItems.length > 0"
      class="flex justify-between items-center pt-4"
    >
      <p class="text-lg font-bold">
        Total: ${{ cartStore.totalCartPrice.toFixed(2) }}
      </p>
      <Button variant="secondary" class="px-6 py-2" @click="confirm"
        >Confirm Order</Button
      >
    </div>
  </div>
</template>
