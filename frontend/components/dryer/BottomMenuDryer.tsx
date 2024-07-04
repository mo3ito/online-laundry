"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useDryerContext from "@/hooks/useDryerContext";

export default function BottomMenuDryer() {
  const {totalOrders} = useDryerContext()
  return (
    <div className=" pt-3 h-20 bg-sky-500 border-t sticky bottom-0 flex items-center justify-between sm:justify-around px-8  mx-auto border border-sky-500  shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6  ">
      <Link href="/dryer">
        <svg
          className=" size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path>
        </svg>
      </Link>
      <Link href="/dryer/orders/service" className="relative">
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
        </svg>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute right-[5px] -top-3 text-sm ">
          {totalOrders}
        </div>
      </Link>

      <Link href="/dryer/orders/history" className="relative">
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
        </svg>
      </Link>
    </div>
  );
}
