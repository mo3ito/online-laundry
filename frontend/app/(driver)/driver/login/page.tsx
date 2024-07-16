"use client";
import React from "react";
import Login from "@/components/Login";
import { DRIVER_LOGIN } from "@/routeApi/endpoints";

export default function page() {
  return (
    <Login
      header="ورود رانندگان"
      apiAddress={DRIVER_LOGIN}
      pathRoute={`${process.env.NEXT_PUBLIC_BASE_URL}/driver`}
      registerRoute={`${process.env.NEXT_PUBLIC_BASE_URL}/driver/register`}
    />
  );
}
