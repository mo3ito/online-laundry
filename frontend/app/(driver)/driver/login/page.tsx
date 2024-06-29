"use client";
import React from "react";
import Login from "@/components/Login";
import { DRIVER_LOGIN } from "@/routeApi/endpoints";

export default function page() {
  return (
    <Login
      header="ورود رانندگان"
      apiAddress={DRIVER_LOGIN}
      pathRoute="/driver"
      registerRoute="/driver/register"
    />
  );
}
