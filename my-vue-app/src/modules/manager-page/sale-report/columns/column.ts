import type { ColumnDef } from "@tanstack/vue-table";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-vue-next";
import { h } from "vue";
import type { SaleType } from "@/api/sale-report/types";
//   import { valueUpdater } from '@/utils';

export const columns: ColumnDef<SaleType>[] = [
  {
    id: "no",
    header: () => "No.",
    cell: ({ row }) => row.index + 1, // Display the row number (index starts at 0, so add 1)
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
    header: ({ column }) => {
      return h(
        Button,
        {
          variant: "ghost",
          class: "no-hover",
          onClick: () => column.toggleSorting(column.getIsSorted() === "asc"),
        },
        () => ["Name", h(ArrowUpDown, { class: "ml-2 h-4 w-4 " })]
      );
    },
    cell: ({ row }) =>
      h("div", { class: "lowercase" }, row.getValue("productName")),
  },
  {
    accessorKey: "totalPrice",
    header: () => h("div", { class: "text-left" }, "Total Price"),
    cell: ({ row }) => {
      const totalPrice = Number.parseFloat(row.getValue("totalPrice"));

      return h("div", { class: "text-left font-medium" }, totalPrice);
    },
  },
  {
    accessorKey: "totalProfit",
    header: () => h("div", { class: "text-left" }, "Total Profit"),
    cell: ({ row }) => {
      const totalProfit = Number.parseFloat(row.getValue("totalProfit"));

      // Format the amount as a dollar amount
      // const formatted = new Intl.NumberFormat('en-US', {
      //   style: 'currency',
      //   currency: 'MMK',
      // }).format(totalProfit)

      return h("div", { class: "text-left font-medium" }, totalProfit);
    },
  },
];

// const sorting = ref<SortingState>([])
//   const columnFilters = ref<ColumnFiltersState>([])
//   export const columnVisibility = ref<VisibilityState>({})
//   const rowSelection = ref({})
//   const expanded = ref<ExpandedState>({})

//   const table = useVueTable({
//     data : saleReportDataSafe,
//     columns,
//     getCoreRowModel: getCoreRowModel(),
//     getPaginationRowModel: getPaginationRowModel(),
//     getSortedRowModel: getSortedRowModel(),
//     getFilteredRowModel: getFilteredRowModel(),
//     getExpandedRowModel: getExpandedRowModel(),
//     onSortingChange: updaterOrValue => valueUpdater(updaterOrValue, sorting),
//     onColumnFiltersChange: updaterOrValue => valueUpdater(updaterOrValue, columnFilters),
//     onColumnVisibilityChange: updaterOrValue => valueUpdater(updaterOrValue, columnVisibility),
//     onRowSelectionChange: updaterOrValue => valueUpdater(updaterOrValue, rowSelection),
//     onExpandedChange: updaterOrValue => valueUpdater(updaterOrValue, expanded),
//     state: {
//       get sorting() { return sorting.value },
//       get columnFilters() { return columnFilters.value },
//       get columnVisibility() { return columnVisibility.value },
//       get rowSelection() { return rowSelection.value },
//       get expanded() { return expanded.value },
//     },
//   })

export const columnVisibility = {
  createdAt: false,
};
