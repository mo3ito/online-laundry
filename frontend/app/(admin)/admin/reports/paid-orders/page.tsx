import ShowOrdersForadmin from "@/components/admin/ShowOrdersForAdmin";
import React from "react";
import {
  ADMIN_ALL_PAID_ORDERS,
  ADMIN_DELETE_PAID_ORDERS,
} from "@/routeApi/endpoints";

export default function page() {
  return (
    <ShowOrdersForadmin
      ordersApi={ADMIN_ALL_PAID_ORDERS}
      isDeleteButton={true}
      dleteOrderApi={ADMIN_DELETE_PAID_ORDERS}
      headersPage="سفارشات پرداخت شده"
      emptyMessage="هیچ سفارش پرداخت شده‌ای وجود ندارد"
    />
  );
}
