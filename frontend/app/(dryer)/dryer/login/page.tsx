import React from "react";
import Login from "@/components/Login";

export default function page() {
  return (
    <Login
      header="ورود خشکشویی"
      apiAddress="http://localhost:4000/dryer/login"
      pathRoute="/dryer"
      registerRoute="/dryer/register"
    />
  );
}
