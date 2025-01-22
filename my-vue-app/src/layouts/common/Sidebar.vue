<script setup lang="ts">

import {
  Home,
  Package2,
  ShoppingCart,
  Users,
  CreditCard,
  Receipt,
  ShoppingBag,
  Clipboard,
} from "lucide-vue-next";

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

</script>

<template>
  <div
    class="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]"
  >
    <div class="hidden border-r bg-muted/40 md:block">
      <div class="flex h-full max-h-screen flex-col gap-2">
        <div class="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
          <RouterLink
            to="/"
            class="flex items-center gap-2 font-semibold"
          >
            <Package2 class="h-5 w-5" />
            <span class="">Retail Management App</span>
          </RouterLink>
        </div>
        <div class="flex-1">
          <nav class="grid items-start px-2 text-sm font-medium lg:px-4">
            <RouterLink
              to="/"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <Home class="h-4 w-4" />
              Dashboard
            </RouterLink>

            <RouterLink
              to="/product"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <ShoppingBag class="h-5 w-5" />
              Product
            </RouterLink>

            <RouterLink
              to="/cart"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <ShoppingCart class="h-5 w-5" />
              Cart
            </RouterLink>

            <RouterLink
              to="/cashier"
              class="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary pb-4"
            >
              <CreditCard class="h-5 w-5" />
              Cashier
            </RouterLink>

            <!-- Collapsible Section for Manager View -->
            <Collapsible>
              <CollapsibleTrigger
                class="flex w-full items-center justify-between gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary cursor-pointer pb-4"
              >
                <div class="flex items-center gap-3">
                  <Users class="h-5 w-5" />
                  <span class="transition-transform duration-300">
                    Manager View
                  </span>
                </div>
                <!-- <ChevronRight
                  class="h-4 w-4 transition-transform duration-300"
                  :class="{ 'rotate-90': open }"
                /> -->
              </CollapsibleTrigger>
              <CollapsibleContent
                class="overflow-hidden transition-all duration-300"
              >
                <RouterLink
                  to="/manager/sale-report"
                  class="flex items-center gap-3 rounded-lg px-6 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                <Clipboard class="h-5 w-5" />
                Sale Report
                </RouterLink>
                <RouterLink
                  to="/manager/summary-report"
                  class="flex items-center gap-3 rounded-lg px-6 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                <Receipt class="h-5 w-5" />
                  Summary Report
                </RouterLink>
              </CollapsibleContent>
            </Collapsible>
          </nav>
        </div>
      </div>
    </div>
  </div>
</template>
