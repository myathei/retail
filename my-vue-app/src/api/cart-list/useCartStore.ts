import { defineStore } from "pinia";
import { computed, ref } from "vue";

export interface Product {
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
}

export const useCartStore = defineStore("cart", () => {
  // State
  const cartItems = ref<{ product: Product; quantity: number }[]>([]);
  

  // Getters
  const countCartItems = computed(() =>
    cartItems.value.reduce((total, item) => total + item.quantity, 0)
  );

  const totalCartPrice = computed(() =>
    cartItems.value.reduce(
      (total, item) => total + item.product.sellingPrice * item.quantity,
      0
    )
  );

  // Actions
  const addProductToCart = (product: Product) => {
    const existingItem = cartItems.value.find(
      (item) => item.product.productID === product.productID
    );

    if (existingItem) {
      if (existingItem.quantity < product.stock) {
        existingItem.quantity += 1;
      }
    } else {
      cartItems.value.push({ product, quantity: 1 });
    }

    
  };

  const decreaseFromCart = (product: Product) => {
    cartItems.value = cartItems.value.map((item) => {
      if (item.product.productID === product.productID) {
        if (item.quantity > 1) {
          // Decrease quantity
          return {
            ...item,
            quantity: item.quantity - 1,
          };
        } else {
          // If quantity is 1, remove it by filtering
          return null; // Mark for removal
        }
      }
      return item;
    }).filter((item) => item !== null); // Remove items marked as null
  };
  
  const removeProductFromCart = (product: Product) => {
    cartItems.value = cartItems.value.filter(
      (item) => item.product.productID !== product.productID
    );
  }; 

  const clearCart = () => cartItems.value = [];

  const updateQuantity = (product: Product, quantity: number) => {
    const existingItem = cartItems.value.find(
      (item) => item.product.productID === product.productID
    );

    if (existingItem) {
      existingItem.quantity = quantity;
    }
  };

  const getCartItems = () => {
    return Object.values(cartItems.value);
  };

  // Return state, getters, and actions
  return {
    cartItems,
    countCartItems,
    totalCartPrice,
    addProductToCart,
    removeProductFromCart,
    clearCart,
    updateQuantity,
    decreaseFromCart,
    getCartItems
  };
});
