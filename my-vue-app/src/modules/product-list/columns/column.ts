import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { computed, h, ref, onMounted, watch } from "vue";
import {
  ArrowUpDown,
  EditIcon,
  MinusIcon,
  PlusIcon,
  Trash2,
} from "lucide-vue-next";
import type { ProductType } from "@/api/product-list/types";
import { useToast } from "@/components/ui/toast";
import { useCartStore } from "@/api/cart-list/useCartStore";
import { getActivePinia } from "pinia";
import { deletProduct } from "@/api/product-list/queries";

// Product Interface
interface Product {
  productID: string;
  productName: string;
  stock: number;
  sellingPrice: number;
}

// Helper to safely initialize the cart store
const getCartStore = () => {
  const pinia = getActivePinia();
  if (!pinia) {
    throw new Error("Pinia is not initialized.");
  }
  return useCartStore(pinia);
};

// Toast for notifications
const { toast } = useToast();

// Ref for managing product quantities in the cart
const productQuantities = ref<Record<string, number>>({});

const isOpen = ref(false);
const isEdit = ref(false);
const updateProduct = ref<ProductType>();

// Sync product quantities with cart items when the product page loads
onMounted(() => {
  const cartStore = getCartStore();
  const cartItems = cartStore.getCartItems();
  productQuantities.value = cartItems.reduce((acc, cartItem) => {
    acc[cartItem.product.productID] = cartItem.quantity;
    return acc;
  }, {} as Record<string, number>);
});

// Add a product to the cart
const addToCart = (product: Product) => {
  if (!productQuantities.value[product.productID]) {
    productQuantities.value[product.productID] = 0;
  }
  productQuantities.value[product.productID]++;
  getCartStore().addProductToCart(product);
  toast({
    description: `${product.productName} added successfully!`,
    duration: 1000,
  });
};

// Increase product quantity
const increaseQuantity = (product: Product) => {
  productQuantities.value[product.productID]++;
  getCartStore().addProductToCart(product);
};

// Decrease product quantity
const decreaseQuantity = (product: Product) => {
  const currentQuantity = productQuantities.value[product.productID] || 0;
  if (currentQuantity > 0) {
    productQuantities.value[product.productID]--;
    getCartStore().decreaseFromCart(product);
  }
};

// Delete a product
const deleteProduct = (values: any) => {
  const confirm = window.confirm("Are you sure you want to delete this product?");
  if (confirm) {
    toast({
      description: "Deleted successfully!",
      duration: 1000,
    });
    const { mutate: delProduct } = deletProduct.useMutation();
    delProduct(values);
  }
};

const openEditDialog = (product: ProductType) => {
  console.log("Opening edit dialog with product:", product);
  isOpen.value = true; // Ensure this toggles the dialog open
  isEdit.value = true; // Indicate we're editing
  updateProduct.value = { ...product }; // Pass a copy of the product to avoid mutating the original object
};


watch(isOpen, (newValue) => {
  console.log("Dialog state changed:", newValue);
});

const closeDialog = () => {
  isOpen.value = false;
  isEdit.value = false;
  updateProduct.value = undefined; // Clear the product being edited
};


// Table columns definition
export const columns: ColumnDef<ProductType>[] = [
  {
    id: "no",
    header: () => "No.",
    cell: ({ row }) => row.index + 1,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "select",
    header: ({ table }) =>
      h(Checkbox, {
        checked:
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate"),
        "onUpdate:checked": (value) => table.toggleAllPageRowsSelected(!!value),
        ariaLabel: "Select all",
      }),
    cell: ({ row }) =>
      h(Checkbox, {
        checked: row.getIsSelected(),
        "onUpdate:checked": (value) => row.toggleSelected(!!value),
        ariaLabel: "Select row",
      }),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "productName",
    header: ({ column }) =>
      h(
        Button,
        {
          variant: "ghost",
          class: "no-hover",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4" })]
      ),
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("productName")),
  },
  {
    accessorKey: "stock",
    header: () => h("div", { class: "text-left" }, "Stock"),
    cell: ({ row }) => {
      const stock = Number.parseFloat(row.getValue("stock"));
      return h("div", { class: "text-left font-medium" }, stock);
    },
  },
  {
    accessorKey: "sellingPrice",
    header: () => h("div", { class: "text-left" }, "Selling Price"),
    cell: ({ row }) => {
      const sellingPrice = Number.parseFloat(row.getValue("sellingPrice"));
      return h("div", { class: "text-left font-medium" }, sellingPrice);
    },
  },
  {
    accessorKey: "action",
    header: () => h("div", { class: "text-left" }, "Action"),
    cell: ({ row }) => {
      const product = row.original;
      const quantity = computed(
        () => productQuantities.value[product.productID] || 0
      );

      return h("div", { class: "flex text-center gap-2" }, [
        quantity.value === 0
          ? h(
              Button,
              {
                class: "bg-pink-400 text-white hover:bg-pink-600",
                onClick: () => addToCart(product),
              },
              () => [h(PlusIcon, { class: "w-4 h-4" }), "Add to Cart"]
            )
          : h("div", { class: "flex items-center gap-2" }, [
              h(
                Button,
                {
                  class: "bg-gray-400 text-white hover:bg-gray-600",
                  onClick: () => decreaseQuantity(product),
                },
                () => h(MinusIcon, { class: "w-4 h-4" })
              ),
              h("span", { class: "text-lg font-bold" }, quantity.value),
              h(
                Button,
                {
                  class: "bg-gray-400 text-white hover:bg-gray-600",
                  onClick: () => increaseQuantity(product),
                },
                () => h(PlusIcon, { class: "w-4 h-4" })
              ),
            ]),
            h(
              Button,
              {
                class: "bg-cyan-600 hover:bg-cyan-800",
                onClick: () => openEditDialog(product), // Ensure `row.original` passes the correct product
              },
              () => [h(EditIcon, { class: "w-4 h-4 text-white" })]
            ),
        h(
          Button,
          {
            class: "bg-red-600 hover:bg-red-800",
            onClick: () => deleteProduct(product),
          },
          () => [h(Trash2, { class: "w-4 h-4 text-white" })]
        ),
      ]);
    },
  },
];

export const columnVisibility = {
  createdAt: false,
};

