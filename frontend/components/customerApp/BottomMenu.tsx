'use client'
import {useContext} from "react";
import Link from "next/link";
import { OrderCardContext } from "@/context/order-card";
import { OrderCardContextType } from "@/types/context/orderCard";


export default function BottomMenu() {

  const orderContext = useContext<OrderCardContextType | null>(OrderCardContext);
  const {totalNumber} = orderContext as OrderCardContextType ;




  return (
    <div className=" pt-3 h-20 bg-sky-500 border-t sticky bottom-0 flex items-center justify-between px-8 z-50 mx-auto border border-sky-500  shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6 max-[280px]:text-[10px] text-xs sm:text-sm md:text-base ">
      <Link href="/application" className="flex items-center flex-col justify-center">
        <svg
          className=" size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path>
        </svg>
        <p className="text-white">خانه</p>
      </Link>
      <button className="flex items-center flex-col justify-center">
        <svg
          className="size-8 fill-white mb-1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M18.364 17.364L12 23.7279L5.63604 17.364C2.12132 13.8492 2.12132 8.15076 5.63604 4.63604C9.15076 1.12132 14.8492 1.12132 18.364 4.63604C21.8787 8.15076 21.8787 13.8492 18.364 17.364ZM12 15C14.2091 15 16 13.2091 16 11C16 8.79086 14.2091 7 12 7C9.79086 7 8 8.79086 8 11C8 13.2091 9.79086 15 12 15ZM12 13C10.8954 13 10 12.1046 10 11C10 9.89543 10.8954 9 12 9C13.1046 9 14 9.89543 14 11C14 12.1046 13.1046 13 12 13Z"></path>
        </svg>
        <p className="text-white">آدرس‌های منتخب</p>
      </button>
      <Link href="/application/order" className="flex items-center flex-col justify-center relative">

        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.3709 3.44L18.5819 9.002L22.0049 9.00218V11.0022L20.8379 11.002L20.0813 20.0852C20.0381 20.6035 19.6048 21.0022 19.0847 21.0022H4.92502C4.40493 21.0022 3.97166 20.6035 3.92847 20.0852L3.17088 11.002L2.00488 11.0022V9.00218L5.42688 9.002L8.63886 3.44L10.3709 4.44L7.73688 9.002H16.2719L13.6389 4.44L15.3709 3.44ZM13.0049 13.0022H11.0049V17.0022H13.0049V13.0022ZM9.00488 13.0022H7.00488V17.0022H9.00488V13.0022ZM17.0049 13.0022H15.0049V17.0022H17.0049V13.0022Z"></path>
        </svg>
        <p className="text-white">سفارشات</p>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute -top-3  ">{totalNumber}</div>
      </Link>
    </div>
  );
}
