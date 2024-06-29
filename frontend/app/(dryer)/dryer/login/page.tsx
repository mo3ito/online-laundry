'use client'
import React from "react";
import Login from "@/components/Login";
import { DRYER_LOGIN } from "@/routeApi/endpoints";

export default function page() {
  return (
    <Login
      header="ورود خشکشویی"
      apiAddress={DRYER_LOGIN}
      pathRoute="/dryer"
      registerRoute="/dryer/register"
    />
  );
}
