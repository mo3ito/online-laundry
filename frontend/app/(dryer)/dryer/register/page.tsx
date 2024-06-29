"use client";
import React from "react";
import Register from "@/components/Register";
import { DRYER_REGISTER } from "@/routeApi/endpoints";

export default function page() {
  return (
    <Register
      apiAddress={DRYER_REGISTER}
      pathRoute="/dryer"
      header="ثبت‌نام خشکشویی"
      loginRoute="/dryer/login"
    />
  );
}
