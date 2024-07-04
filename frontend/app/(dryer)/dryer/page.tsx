"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import LoadingPage from "@/components/Loading/LoadingPage";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DRYER_ORDERS } from "@/routeApi/endpoints";
import useDryerContext from "@/hooks/useDryerContext";

export default function page() {
  const { infos } = useAuthContext();
  const { setTotalOrders } = useDryerContext();
  const { data, isLoading } = useGetReactQuery(infos?._id, DRYER_ORDERS, [
    "get recived orders",
  ]);

  useEffect(() => {
    if (data) {
      setTotalOrders(data.data.length);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <main
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <section className="w-full h-full flex flex-col items-center justify-center  gap-y-4 px-6 pt-10 pb-14 sm:px-8 text-lg ">
        <Link
          href="/dryer/orders/service"
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
          سفارشات
        </Link>
        <Link
          href="/dryer/orders/history"
          className="w-full h-1/3 bg-green-300 rounded-lg flex flex-col items-center justify-center"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C6.47715 22 2 17.5228 2 12H4C4 16.4183 7.58172 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.25022 4 6.82447 5.38734 5.38451 7.50024L8 7.5V9.5H2V3.5H4L3.99989 5.99918C5.82434 3.57075 8.72873 2 12 2ZM13 7L12.9998 11.585L16.2426 14.8284L14.8284 16.2426L10.9998 12.413L11 7H13Z"></path>
          </svg>
          تاریخچه سفارشات
        </Link>
        <Link
          href="/driver/edit-information"
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
