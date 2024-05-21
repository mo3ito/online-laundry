import LaundryMenu from "@/components/customerApp/laundry-menu/LaundryMenu";
import React from "react";

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 244px)` }}
      className="w-full  bg-slate-100 border-2  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6 relative"
    >
      <h1 className="w-full bg-sky-500 p-3 my-2 text-center text-white">
        خشکشویی
      </h1>
      <LaundryMenu/>
      <div className="w-full h-20 bg-white border-t shadow-xl bottom-0 left-0 absolute"></div>
    </div>
  );
}
