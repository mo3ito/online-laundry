import React from "react";
import Register from "@/components/Register";

export default function page() {
  return (
    <Register
      apiAddress="http://localhost:4000/dryer/register"
      pathRoute="/dryer"
      header="ثبت‌نام خشکشویی"
      loginRoute="/dryer/login"
    />
  );
}
