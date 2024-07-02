import React from "react";
import DriverOrdersShow from "@/components/DriverOrdersShow";
import { DRIVER_GET_ALL_ORDERS_IS_NOT_DONE } from "@/routeApi/endpoints";

export default function page() {
  return (
    <DriverOrdersShow
      apiAddress={DRIVER_GET_ALL_ORDERS_IS_NOT_DONE}
      header="سفارشات دریافتی"
      buttonName="عملیات دریافت"
      isGet={true}
    />
  );
}
