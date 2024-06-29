"use client";
import { DRIVER_REGISTER } from "@/routeApi/endpoints";
import Register from "@/components/Register";

export default function page() {
  return (
    <Register
      apiAddress={DRIVER_REGISTER}
      pathRoute="/driver"
      header="ثبت‌نام رانندگان"
      loginRoute="/driver/login"
    />
  );
}
