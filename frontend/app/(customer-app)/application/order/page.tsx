"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import useOrderCardContext from "@/hooks/useOrderCardContext";
import minesClothingHandler from "@/utils/minesClothingHandler";
import addClothingHandler from "@/utils/addClothingHandler";
import Modal from "@/components/Modal";
import { useState, useEffect } from "react";
import confirmDeleteHandler from "@/utils/confirmDeleteHandler";
import delteHandler from "@/utils/deleteHandler";
import useInformation from "@/hooks/useInformation";
import Link from "next/link";

export default function page() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { orders, setOrders } = useOrderCardContext();
  const { totalNumber } = useOrderCardContext();
  const [totalPrice, setTotalPrice] = useState<number | null>(null);
  const {
    informationForDelete,
    setInformationForDelete,
    isTheSameServiceAndType,
  } = useInformation();

  console.log(orders);

  useEffect(() => {
    const totalPrice = orders.reduce((prev, current) => {
      return prev + current.totalCost;
    }, 0);
    setTotalPrice(totalPrice);
  }, [orders]);

  return (
    <div
      style={{ height: `calc(100vh - 80px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500 pb-28 "
    >
      <HeaderComponent title="سفارشات جدید شما" as="header" />
      {orders.length > 0 && (
        <section className=" h-max border bg-yellow-200 p-2 rounded-lg shadow-xl  max-[280px]:text-xs text-sm sm:text-base mx-6 sm:mx-8 ">
          <span className="inline-block text-base sm:text-lg">
            <svg
              className="size-5 sm:size-6 fill-red-400 inline-block ml-1"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M9 17C9 17 16 18 19 21H20C20.5523 21 21 20.5523 21 20V13.937C21.8626 13.715 22.5 12.9319 22.5 12C22.5 11.0681 21.8626 10.285 21 10.063V4C21 3.44772 20.5523 3 20 3H19C16 6 9 7 9 7H5C3.89543 7 3 7.89543 3 9V15C3 16.1046 3.89543 17 5 17H6L7 22H9V17ZM11 8.6612C11.6833 8.5146 12.5275 8.31193 13.4393 8.04373C15.1175 7.55014 17.25 6.77262 19 5.57458V18.4254C17.25 17.2274 15.1175 16.4499 13.4393 15.9563C12.5275 15.6881 11.6833 15.4854 11 15.3388V8.6612ZM5 9H9V15H5V9Z"></path>
            </svg>
            توجه
          </span>
          <p className="mt-2 ">
            برای سفارش‌های بیشتر از ۲۰۰ هزار تومان هزینه پیک رایگان می‌باشد.
          </p>
        </section>
      )}
      {orders.length ? (
        <>
          <ul className="w-full h-max pt-6 px-6 sm:pt-8 sm:px-8">
            {orders.map((order) => (
              <li
                key={order.id}
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
                    <p>مبلغ واحد</p>
                    <p>{Number(order.cost).toLocaleString("en-US")} تومان</p>
                  </div>
                  <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                    <p>تعداد</p>
                    <p>{order.count}</p>
                  </div>
                  <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                    <p>مبلغ</p>
                    <p>
                      {Number(order.totalCost).toLocaleString("en-US")} تومان
                    </p>
                  </div>
                  <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                    <p>عملیات</p>
                    <div className="flex  items-center justify-center gap-x-1 sm:gap-x-2 ">
                      <button
                        onClick={() =>
                          delteHandler(
                            orders,
                            setOrders,
                            order.id,
                            order.service_type,
                            order.type_clothing,
                            setInformationForDelete,
                            setIsShowModal
                          )
                        }
                        className="h-5 w-7 sm:h-7 sm:w-9 rounded-lg bg-sky-200 text-lg flex items-center justify-center"
                      >
                        <svg
                          className="size-4 sm:size-5"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                        >
                          <path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path>
                        </svg>
                      </button>
                      <button
                        onClick={() =>
                          addClothingHandler(
                            orders,
                            setOrders,
                            order.id,
                            order.service_type,
                            order.type_clothing,
                            1,
                            order.cost,
                            order.totalCost
                          )
                        }
                        className="h-5 w-7 sm:h-7 sm:w-9 rounded-lg bg-sky-200 text-lg flex items-center justify-center"
                      >
                        +
                      </button>
                      <button
                        onClick={() =>
                          minesClothingHandler(
                            orders,
                            order.id,
                            setOrders,
                            order.service_type,
                            order.cost,
                            1
                          )
                        }
                        className=" h-5 w-7 sm:h-7 sm:w-9 rounded-lg bg-sky-200 text-lg flex items-center justify-center"
                      >
                        -
                      </button>
                    </div>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <section className=" h-max border border-sky-500 p-2 rounded-lg shadow-xl  max-[280px]:text-xs text-sm sm:text-base mx-6 sm:mx-8">
            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2  w-full  ">
              <p>تعداد کل سفارشات </p>
              <p>{totalNumber} عدد</p>
            </div>
            <div className="flex max-[280px]:justify-start justify-between  items-center  gap-x-2  w-full mb-3 ">
              <p>مبلغ کل</p>
              <p>{totalPrice?.toLocaleString("en-US")} تومان</p>
            </div>
            <Link
              href="/application/location"
              className="bg-sky-500 py-2 w-full rounded-lg text-white inline-block text-center"
            >
              تایید و ادامه
            </Link>
          </section>
        </>
      ) : (
        <p className="text-center mt-32">سبد سفارشات جدید شما خالی است</p>
      )}

      <Modal
        messageContent="آیا از حذف اطمینان دارید؟"
        setIsShowModal={setIsShowModal}
        isShowModal={isTheSameServiceAndType && isShowModal}
        confirmOnClick={() =>
          confirmDeleteHandler(
            informationForDelete,
            setInformationForDelete,
            setIsShowModal
          )
        }
      />
    </div>
  );
}
