"use client";
import { useContext } from "react";
import Link from "next/link";
import { OrderCardContext } from "@/context/order-card";
import { OrderCardContextType } from "@/types/context/OrderCard";

export default function BottomMenu() {
  const orderContext = useContext<OrderCardContextType | null>(
    OrderCardContext
  );
  const { totalNumber , totalNumberRegisterdOrders } = orderContext as OrderCardContextType;

  return (
    <div className=" pt-3 h-20 bg-sky-500 border-t sticky bottom-0 flex items-center justify-between px-8  mx-auto border border-sky-500  shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6  ">
      <Link
        href="/application"
        className="flex items-center flex-col justify-center "
      >
        <svg
          className=" size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path>
        </svg>
        <p className="text-white text-sm">خانه</p>
      </Link>
      <Link
        href="/application/order/registered-orders"
        className="flex items-center flex-col justify-center relative"
      >
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.3709 3.44L18.5819 9.002L22.0049 9.00218V11.0022L20.8379 11.002L20.0813 20.0852C20.0381 20.6035 19.6048 21.0022 19.0847 21.0022H4.92502C4.40493 21.0022 3.97166 20.6035 3.92847 20.0852L3.17088 11.002L2.00488 11.0022V9.00218L5.42688 9.002L8.63886 3.44L10.3709 4.44L7.73688 9.002H16.2719L13.6389 4.44L15.3709 3.44ZM13.0049 13.0022H11.0049V17.0022H13.0049V13.0022ZM9.00488 13.0022H7.00488V17.0022H9.00488V13.0022ZM17.0049 13.0022H15.0049V17.0022H17.0049V13.0022Z"></path>
        </svg>
        <p className="text-white text-sm">سفارشات ثبت شده</p>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute -top-3 text-sm ">
          {totalNumberRegisterdOrders}
        </div>
      </Link>

      <Link
        href="/application/order"
        className="flex items-center flex-col justify-center relative"
      >
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M15.3709 3.44L18.5819 9.002L22.0049 9.00218V11.0022L20.8379 11.002L20.0813 20.0852C20.0381 20.6035 19.6048 21.0022 19.0847 21.0022H4.92502C4.40493 21.0022 3.97166 20.6035 3.92847 20.0852L3.17088 11.002L2.00488 11.0022V9.00218L5.42688 9.002L8.63886 3.44L10.3709 4.44L7.73688 9.002H16.2719L13.6389 4.44L15.3709 3.44ZM13.0049 13.0022H11.0049V17.0022H13.0049V13.0022ZM9.00488 13.0022H7.00488V17.0022H9.00488V13.0022ZM17.0049 13.0022H15.0049V17.0022H17.0049V13.0022Z"></path>
        </svg>
        <p className="text-white text-sm">سفارشات</p>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute -top-3 text-sm ">
          {totalNumber}
        </div>
      </Link>
    </div>
  );
}
