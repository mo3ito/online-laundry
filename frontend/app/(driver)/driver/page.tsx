"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import {
  DRIVER_GET_ALL_ORDERS_IS_DONE,
  DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
} from "@/routeApi/endpoints";
import LoadingPage from "@/components/Loading/LoadingPage";
import useGetTotalOrders from "@/hooks/useGetTotalOrders";

export default function page() {
  const { isLoading, isLoadingForIsDoneOrders } = useGetTotalOrders(
    DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
    DRIVER_GET_ALL_ORDERS_IS_DONE
  );

  if (isLoading && isLoadingForIsDoneOrders) {
    return <LoadingPage />;
  }
  return (
    <main
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <section className="w-full h-full flex flex-col items-center justify-center  gap-y-4 px-6 pt-10 pb-14 sm:px-8 text-lg ">
        <Link
          href="/driver/orders/get"
          className="w-full h-1/3 bg-yellow-300 rounded-lg flex items-center justify-center flex-col"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
          </svg>
          سفارشات دریافتی
        </Link>
        <Link
          href="/driver/orders/send"
          className="w-full h-1/3 bg-green-300 rounded-lg flex flex-col items-center justify-center"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
          </svg>
          سفارشات تحویلی
        </Link>
        <Link
          href="/driver/"
          className="w-full h-1/3 bg-pink-300 rounded-lg flex flex-col items-center justify-center mb-3"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
          </svg>
          ویرایش اطلاعات
        </Link>
      </section>
    </main>
  );
}
