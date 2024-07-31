import ShowOrdersForadmin from "@/components/admin/ShowOrdersForAdmin";
import {
  ADMIN_DELETE_ORDERS,
  ADMIN_GET_ALL_ORDERS,
} from "@/routeApi/endpoints";
import React from "react";

export default function page() {
  return (
    <ShowOrdersForadmin
      ordersApi={ADMIN_GET_ALL_ORDERS}
      isDeleteButton={true}
      dleteOrderApi={ADMIN_DELETE_ORDERS}
      headersPage="کل سفارشات پرداخت نشده"
      emptyMessage="هیچ سفارشی وجود ندارد"
    />
  );
}
