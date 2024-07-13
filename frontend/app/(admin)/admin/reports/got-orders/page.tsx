import React from "react";
import ShowOrdersForadmin from "@/components/admin/showOrdersForAdmin";
import { ADMIN_GOT_ORDERS, ADMIN_DELETE_ORDERS } from "@/routeApi/endpoints";

export default function page() {
  return (
    <ShowOrdersForadmin
      ordersApi={ADMIN_GOT_ORDERS}
      idDeleteButton={true}
      dleteOrderApi={ADMIN_DELETE_ORDERS}
      headersPage="سفارشات تحویل گرفته شده"
      emptyMessage="هیچ سفارش تحویل گرفته شده‌ای وجود ندارد"
    />
  );
}
