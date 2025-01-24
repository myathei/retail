import { createRouter, createWebHistory } from "vue-router";

import ProductListView from "@/modules/product-list/ProductListView.vue";
import AppLayout from "@/layouts/AppLayout.vue";
import CartView from "@/modules/cart-list/CartView.vue";
import CashierView from "@/modules/cashier-page/CashierView.vue";
import SaleReportView from "@/modules/manager-page/sale-report/SaleReportView.vue";
import SummaryReport from "@/modules/manager-page/summary-report/SummaryReport.vue";
import DashboardView from "@/modules/dashboard/DashboardView.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/",
      name: "",
      component: AppLayout,
      children: [
        {
          path: "/",
          name: "dashboard",
          component: DashboardView,
        },
        {
          path: "/product",
          name: "product",
          component: ProductListView,
        },
        {
          path: "/cart",
          name: "cart",
          component: CartView,
        },
        {
          path: "/cashier",
          name: "cashier",
          component: CashierView,
        },
        {
          path: "/manager/sale-report",
          name: "sale-report",
          component: SaleReportView,
        },
        {
          path: "/manager/summary-report",
          name: "summary-report",
          component: SummaryReport,
        },
      ],
    },
  ],
});

export default router;
