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
import LoadingPage from "@/components/Loading/LoadingPage";
import Link from "next/link";

export default function page() {
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const { orders, setOrders } = useOrderCardContext();
  const {totalNumber} = useOrderCardContext()
  const [totalPrice , setTotalPrice]=useState<number | null>(null)
  const {informationForDelete, setInformationForDelete, isTheSameServiceAndType} = useInformation();

  console.log(orders);
  
  useEffect(() => {
    const totalPrice = orders.reduce((prev, current) => {
      return prev + current.totalCost;
    }, 0);
    setTotalPrice(totalPrice)

  }, [orders]);

  return (
    
    <div
      style={{ height: `calc(100vh - 80px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500 pb-28 "
    >
      <HeaderComponent title="سفارشات جدید شما" as="header" />
      { orders.length ? <>
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
                <p>{Number(order.totalCost).toLocaleString("en-US")} تومان</p>
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

      <div className=" h-max border border-sky-500 p-2 rounded-lg shadow-xl  max-[280px]:text-xs text-sm sm:text-base mx-6 sm:mx-8">
        <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2  w-full  ">
          <p>تعداد کل سفارشات </p>
          <p>{totalNumber} عدد</p>
        </div>
        <div className="flex max-[280px]:justify-start justify-between  items-center  gap-x-2  w-full mb-3 ">
          <p>مبلغ کل</p>
          <p>{totalPrice?.toLocaleString("en-US")} تومان</p>
        </div>
        <Link href="/application/location" className="bg-sky-500 py-2 w-full rounded-lg text-white inline-block text-center">
          تایید و ادامه
        </Link>
      </div>
      </> : <p className="text-center mt-32">سبد سفارشات جدید شما خالی است</p>}

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
