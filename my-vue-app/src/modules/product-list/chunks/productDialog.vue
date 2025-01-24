<script setup lang="ts">
import { useToast } from "@/components/ui/toast";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { toTypedSchema } from "@vee-validate/zod";
import { addProduct, updateProduct } from "@/api/product-list/queries";
import { watch } from "vue";
import * as z from "zod";
import type { ProductType } from "@/api/product-list/types";
import { useForm } from "vee-validate";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useQueryClient } from "@tanstack/vue-query";

const queryClient = useQueryClient();

const { toast } = useToast();

const props = defineProps<{
  isOpen: boolean;
  isEdit: boolean;
  product: ProductType | undefined;
  close: () => void;
}>();

const formSchema = toTypedSchema(
  z.object({
    productName: z.string().min(2).max(50),
    sellingPrice: z.number().min(1),
    stock: z.number().min(1),
    profitPerItem: z.number().min(1),
  })
);

const { handleSubmit, setValues, resetForm } = useForm({
  validationSchema: formSchema,
  initialValues: {
    productName: "",
    sellingPrice: undefined,
    stock: undefined,
    profitPerItem: undefined,
  },
});

const { mutate: AddProduct } = addProduct.useMutation({
  onError: (data) => {
    toast({
      title: data.message,
      variant: "destructive",
    });
  },
  onSuccess: (data) => {
    console.log(data);
    toast({
      title: data.message,
    });
    closeDialog();
  },
  onSettled: () => {
    queryClient.invalidateQueries({
      queryKey: ["getAllProduct"],
    });
  },
});

const { mutate: UpdateProduct } = updateProduct.useMutation({
  onError: (data) => {
    toast({
      title: data.message,
      variant: "destructive",
    });
  },
  onSuccess: async (data) => {
    toast({
      title: data.message,
    });
    queryClient.invalidateQueries({
      queryKey: ["getAllProduct"],
    });
    closeDialog();
  },
});

const onSubmit = handleSubmit((values) => {
  try {
    const payload = props.isEdit
      ? {
          productID: props.product?.productID,
          productName: values.productName,
          stock: values.stock,
          sellingPrice: values.sellingPrice,
          profitPerItem: values.profitPerItem,
        }
      : {
          productName: values.productName,
          stock: values.stock,
          sellingPrice: values.sellingPrice,
          profitPerItem: values.profitPerItem,
        };

    if (props.isEdit) {
      console.log(payload);
      UpdateProduct(payload as ProductType);
    } else {
      AddProduct(payload as ProductType);
    }
  } catch (error) {
    console.error(error);
  } finally {
    close();
  }
});

const initializeForm = () => {
  if (props.isEdit) {
    setValues({
      productName: props?.product?.productName || "",
      stock: props?.product?.stock || undefined,
      sellingPrice: props?.product?.sellingPrice || undefined,
      profitPerItem: props?.product?.profitPerItem || undefined,
    });
  } else {
    // Reset form when not in edit mode
    resetForm();
  }
};

// Watch for changes in props
watch([() => props.isEdit, () => props.product], () => {
  resetForm();
  initializeForm();
});

const closeDialog = () => {
  props.close();
  resetForm();
};
</script>

<template>
  <Dialog v-model:open="props.isOpen">
    <DialogContent class="bg-white shadow-lg rounded-lg">
      <DialogHeader class="bg-blue-50 p-4 rounded-t">
        <DialogTitle class="text-blue-500 text-lg font-semibold">
          {{ props.isEdit ? "Update " : "Add " }}Product Info
        </DialogTitle>
      </DialogHeader>

      <form id="dialogForm" @submit.prevent="onSubmit" class="p-4">
        <FormField v-slot="{ componentField }" name="productName">
          <FormItem class="mb-4">
            <FormLabel class="block mb-1 font-medium text-gray-700">
              Product Name
            </FormLabel>
            <FormControl>
              <Input
                type="text"
                v-bind="componentField"
                placeholder="Enter product name"
                class="w-full border rounded px-3 py-2"
              />
            </FormControl>
            <FormMessage
              class="text-red-500 text-sm h-4 mt-1"
              style="min-height: 1rem;"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="sellingPrice">
          <FormItem class="mb-4">
            <FormLabel class="block mb-1 font-medium text-gray-700">
              Price
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField"
                placeholder="Enter price"
                min="0"
                class="w-full border rounded px-3 py-2"
              />
            </FormControl>
            <FormMessage
              class="text-red-500 text-sm h-4 mt-1"
              style="min-height: 1rem;"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="stock">
          <FormItem class="mb-4">
            <FormLabel class="block mb-1 font-medium text-gray-700">
              Stock
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField"
                placeholder="Enter stock quantity"
                min="0"
                class="w-full border rounded px-3 py-2"
              />
            </FormControl>
            <FormMessage
              class="text-red-500 text-sm h-4 mt-1"
              style="min-height: 1rem;"
            />
          </FormItem>
        </FormField>

        <FormField v-slot="{ componentField }" name="profitPerItem">
          <FormItem class="mb-4">
            <FormLabel class="block mb-1 font-medium text-gray-700">
              Profit Per Item
            </FormLabel>
            <FormControl>
              <Input
                type="number"
                v-bind="componentField"
                placeholder="Enter profit per item"
                min="0"
                class="w-full border rounded px-3 py-2"
              />
            </FormControl>
            <FormMessage
              class="text-red-500 text-sm h-4 mt-1"
              style="min-height: 1rem;"
            />
          </FormItem>
        </FormField>
      </form>

      <DialogFooter class="flex justify-end p-4 bg-gray-50 rounded-b">
        <Button
          @click="closeDialog"
          type="button"
          variant="secondary"
          class="bg-gray-300 text-gray-700 hover:bg-gray-400 px-4 py-2 rounded mr-2"
        >
          Close
        </Button>
        <Button
          type="submit"
          form="dialogForm"
          class="bg-green-500 text-white hover:bg-green-600 px-4 py-2 rounded"
        >
          {{ props.isEdit ? "Update Product" : "Save Product" }}
        </Button>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>


