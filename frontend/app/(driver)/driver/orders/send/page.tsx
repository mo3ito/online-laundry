import React from "react";
import DriverOrdersShow from "@/components/DriverOrdersShow";
import { DRIVER_GET_ALL_ORDERS_IS_DONE } from "@/routeApi/endpoints";

export default function page() {
  return (
    <DriverOrdersShow
      apiAddress={DRIVER_GET_ALL_ORDERS_IS_DONE}
      header="سفارشات ارسالی"
      buttonName="عملیات پرداخت"
      isGet={false}
    />
  );
}
