"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import {
  DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
  DRIVER_GET_ALL_ORDERS_IS_DONE,
} from "@/routeApi/endpoints";
import LoadingPage from "../Loading/LoadingPage";
import useDriverContext from "@/hooks/useDriverContext";

export default function BottomMenuDriver() {
  const {
    totalIsNotDoneOrders,
    setTotalIsNotDoneOrders,
    totalIsDoneOrders,
    setTotalIsDoneOrders,
  } = useDriverContext();
  const { infos } = useAuthContext();
  const { data: allIsNotDoneOrders, isLoading } = useGetReactQuery(
    infos?._id,
    DRIVER_GET_ALL_ORDERS_IS_NOT_DONE,
    ["all is not done orders"]
  );
  const { data: allIsDoneOrders, isLoading: isLoadingForIsDoneOrders } =
    useGetReactQuery(infos?._id, DRIVER_GET_ALL_ORDERS_IS_DONE, [
      "all is done orders",
    ]);

  console.log(allIsNotDoneOrders);
  console.log(allIsDoneOrders);

  useEffect(() => {
    if (allIsNotDoneOrders) {
      setTotalIsNotDoneOrders(allIsNotDoneOrders?.data?.length);
    }
    if (allIsDoneOrders) {
      setTotalIsDoneOrders(allIsDoneOrders?.data?.length);
    }
  }, [allIsNotDoneOrders, allIsDoneOrders]);

  if (isLoading && isLoadingForIsDoneOrders && !infos?._id) {
    return <LoadingPage />;
  }

  return (
    <div className=" pt-3 h-20 bg-sky-500 border-t sticky bottom-0 flex items-center justify-between sm:justify-around px-8  mx-auto border border-sky-500  shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6  ">
      <Link href="/driver">
        <svg
          className=" size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path>
        </svg>
      </Link>
      <Link href="/driver/orders/get" className="relative">
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
        </svg>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute right-[5px] -top-3 text-sm ">
          {totalIsNotDoneOrders}
        </div>
      </Link>

      <Link href="/driver/orders/send" className="relative">
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M8.96456 18C8.72194 19.6961 7.26324 21 5.5 21C3.73676 21 2.27806 19.6961 2.03544 18H1V6C1 5.44772 1.44772 5 2 5H16C16.5523 5 17 5.44772 17 6V8H20L23 12.0557V18H20.9646C20.7219 19.6961 19.2632 21 17.5 21C15.7368 21 14.2781 19.6961 14.0354 18H8.96456ZM15 7H3V15.0505C3.63526 14.4022 4.52066 14 5.5 14C6.8962 14 8.10145 14.8175 8.66318 16H14.3368C14.5045 15.647 14.7296 15.3264 15 15.0505V7ZM17 13H21V12.715L18.9917 10H17V13ZM17.5 19C18.1531 19 18.7087 18.5826 18.9146 18C18.9699 17.8436 19 17.6753 19 17.5C19 16.6716 18.3284 16 17.5 16C16.6716 16 16 16.6716 16 17.5C16 17.6753 16.0301 17.8436 16.0854 18C16.2913 18.5826 16.8469 19 17.5 19ZM7 17.5C7 16.6716 6.32843 16 5.5 16C4.67157 16 4 16.6716 4 17.5C4 17.6753 4.03008 17.8436 4.08535 18C4.29127 18.5826 4.84689 19 5.5 19C6.15311 19 6.70873 18.5826 6.91465 18C6.96992 17.8436 7 17.6753 7 17.5Z"></path>
        </svg>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute right-[5px] -top-3 text-sm ">
          {totalIsDoneOrders}
        </div>
      </Link>
    </div>
  );
}
