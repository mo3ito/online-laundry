"use client";
import React from "react";
import DriverOrdersShow from "@/components/DriverOrdersShow";
import {
  DRIVER_GET_ALL_ORDERS_IS_DONE,
  DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
} from "@/routeApi/endpoints";
import useGetTotalOrders from "@/hooks/useGetTotalOrders";
import LoadingPage from "@/components/Loading/LoadingPage";

export default function page() {
  const { isLoading, isLoadingForIsDoneOrders } = useGetTotalOrders(
    DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
    DRIVER_GET_ALL_ORDERS_IS_DONE
  );

  if (isLoading && isLoadingForIsDoneOrders) {
    return <LoadingPage />;
  }
  return (
    <DriverOrdersShow
      apiAddress={DRIVER_GET_ALL_ORDERS_IS_DONE}
      header="سفارشات ارسالی"
      buttonName="عملیات پرداخت"
      isGet={false}
    />
  );
}
