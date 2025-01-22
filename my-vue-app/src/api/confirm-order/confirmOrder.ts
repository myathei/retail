import { RouterLink, useRouter } from "vue-router"; // Import useRouter for navigation
import { useCartStore } from "../cart-list/useCartStore";

// Cart store
const cartStore = useCartStore();

// Use Vue Router for navigation
const router = useRouter();

// Confirm Order Method
export const confirm = async () => {
  try {
    // Example logic for confirming the order
    if (cartStore.cartItems.length === 0) {
      alert("Your cart is empty, cannot confirm the order.");
      return;
    }

    // Perform API call or any order-processing logic here (e.g., send to a backend)
    const orderData = {
      items: cartStore.cartItems,
      totalPrice: cartStore.totalCartPrice,
    };

    // Simulating order confirmation
    console.log("Order confirmed:", orderData);

    // Clear the cart after confirmation
    cartStore.clearCart(); 

    // Redirect to order confirmation or another page
    router.push("/order-confirmation"); 

    // Show success message
    alert("Order confirmed successfully!");

  } catch (error) {
    console.error("Order confirmation failed:", error);
    alert("There was an error confirming your order.");
  }
};