import ShowOrdersForadmin from "@/components/admin/showOrdersForAdmin";
import React from "react";
import {
  ADMIN_ALL_PAID_ORDERS,
  ADMIN_DELETE_PAID_ORDERS,
} from "@/routeApi/endpoints";

export default function page() {
  return (
    <ShowOrdersForadmin
      ordersApi={ADMIN_ALL_PAID_ORDERS}
      idDeleteButton={true}
      dleteOrderApi={ADMIN_DELETE_PAID_ORDERS}
      headersPage="سفارشات پرداخت شده"
    />
  );
}
