'use client'
import React, { useRef } from "react";
import DefaultButton from "./share/defaultButton";
import { OrdersType, DefaultModalProps } from "@/types/driver";
import useDropDown from "@/hooks/useDropDown";

export default function PayModal({
  isShowModal = false,
  setIsShowModal,
  data,
  payOnclick
}: DefaultModalProps) {
  const containerRefModal = useRef<HTMLDivElement | null>(null);
  useDropDown(containerRefModal, isShowModal, setIsShowModal);

  return (
    <div
      className={`${
        isShowModal ? "flex" : "hidden"
      } w-full h-screen overflow-hidden fixed top-0 left-0 bg-black/65 z-50 flex items-center justify-center  backdrop-blur px-6 `}
    >
      <div className="container flex items-center justify-center ">
        <div
          ref={containerRefModal}
          className="bg-white overflow-auto py-4 px-6  sm:px-8 rounded-lg relative max-[420px]:px-2 w-full sm:w-10/12 md:w-9/12 lg:w-8/12 2xl:w-7/12 h-max max-h-[700px]"
        >
          <h1 className="text-center">فاکتور مشتری</h1>
          <button
            onClick={() => setIsShowModal(false)}
            className="absolute right-6 sm:right-8 top-4 "
            aria-label="بستن"
          >
            <svg
              className="size-6 fill-red-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
            </svg>
          </button>
          <ul className="w-full h-max pt-6 ">
            {data &&
              data.orders &&
              data?.orders.map((order: OrdersType) => (
                <li
                  key={order._id}
                  className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base"
                >
                  <article>
                    <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                      <p>نوع لباس</p>
                      <p className="">{order.type_clothing}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>نوع خدمات</p>
                      <p>{order.service_type}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>تعداد کل سفارشات</p>
                      <p>{order.count}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>مبلغ واحد</p>
                      <p>{order.cost.toLocaleString("en-US")} تومان</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>مبلغ کل سفارشات</p>
                      <p>{order.totalCost.toLocaleString("en-US")} تومان</p>
                    </div>
                  </article>
                </li>
              ))}
          </ul>
          <section className="">
            <section className="bg-gray-300 p-2 rounded-lg text-center max-[280px]:text-xs text-sm sm:text-base">
              <p className="mb-1">تعداد کل: {data?.allCount}</p>
              <p>مبلغ کل: {data?.allPrice.toLocaleString("en-US")} تومان</p>
            </section>
            <DefaultButton
              onClick={payOnclick}
              content="پرداخت"
              className="w-full max-[280px]:h-6  h-10 bg-sky-500 rounded-lg text-white mt-3 max-[280px]:text-sm "
            />
          </section>
        </div>
      </div>
    </div>
  );
}
