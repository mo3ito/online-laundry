"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import React, { useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import deleteHandler from "@/utils/orders/deleteHandler";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { GET_ORDERS_CUSTOER } from "@/routeApi/endpoints";
import { OrdersRegistered } from "@/types/context/OrderCard";
import useOrderCardContext from "@/hooks/useOrderCardContext";

export default function page() {
  const { infos, login } = useAuthContext();
  const [isShowDelteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const { setRegisteredOrders, registeredOrders } = useOrderCardContext();
  const { data, isLoading } = useGetReactQuery(infos?._id, GET_ORDERS_CUSTOER, [
    "get registerd orders",
  ]);

  useEffect(() => {
    if (data) {
      setRegisteredOrders(data.data);
    }
  }, [data]);

  const deleteHandlerProccess = (orderId: string) => {
    if (orderId) {
      setOrderId(orderId);
      setIsShowDeleteModal(true);
    }
  };

  const [allCountOrders, setAllCountOrders] = useState<number>(0);
  const [allTotalPrice, setAllTotalPrice] = useState<number>(0);

  useEffect(() => {
    if (registeredOrders && registeredOrders.length > 0) {
      const { totalCount, totalPrice } = registeredOrders.reduce(
        (acc, order) => {
          acc.totalCount += order.count;
          acc.totalPrice += order.totalCost;
          return acc;
        },
        { totalCount: 0, totalPrice: 0 }
      );

      setAllCountOrders(totalCount);
      setAllTotalPrice(totalPrice);
    }
  }, [registeredOrders]);

  console.log("Total Count of Orders:", allCountOrders);
  console.log("Total Price of Orders:", allTotalPrice);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div
        style={{ height: `calc(100vh - 80px)` }}
        className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500 pb-20"
      >
        <HeaderComponent title="سفارشات ثبت شده" />

        {registeredOrders?.length ? (
          <section className="w-full  pb-28">
            <section className=" h-max border bg-yellow-200 p-2 rounded-lg shadow-xl  max-[280px]:text-xs text-sm sm:text-base mx-6 sm:mx-8 mb-4">
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
                برای سفارش‌های بیشتر از ۲۰۰ هزارتومان هزینه پیک رایگان می‌باشد.
              </p>
            </section>
            <ul className="w-full h-max px-6 sm:px-8 ">
              {registeredOrders?.map((order: OrdersRegistered) => (
                <li
                  key={order.orders_id}
                  className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base"
                >
                  <article>
                    <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                      <p>نوع لباس:</p>
                      <p className="">{order.type_clothing}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>نوع خدمات:</p>
                      <p>{order.service_type}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>مبلغ واحد:</p>
                      <p>{Number(order.cost).toLocaleString("en-US")} تومان</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>تعداد:</p>
                      <p>{order.count}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>مبلغ:</p>
                      <p>
                        {Number(order.totalCost).toLocaleString("en-US")} تومان
                      </p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>تاریخ ثبت:</p>
                      <p>{order.created_at}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>آدرس:</p>
                      <p className="text-xs sm:text-sm truncate">
                        {order.address}
                      </p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>وضعیت:</p>
                      <p className="text-zinc-400">{order.situation}</p>
                    </div>
                    <DefaultButton
                      disabled={
                        order.situation === "در انتظار تحویل" ? false : true
                      }
                      content="لغو"
                      className={`${
                        order.situation === "در انتظار تحویل"
                          ? "!bg-pink-500"
                          : "bg-zinc-400"
                      } w-full h-10 text-white `}
                      onClick={() => deleteHandlerProccess(order?.orders_id)}
                    />
                  </article>
                </li>
              ))}
            </ul>
            <section className=" h-max border border-sky-500 p-2 rounded-lg shadow-xl  max-[280px]:text-xs text-sm sm:text-base mx-6 sm:mx-8">
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2  w-full  ">
                <p>تعداد کل سفارشات </p>
                <p>{allCountOrders} عدد</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center  gap-x-2  w-full mb-3 ">
                <p>مبلغ کل</p>
                <p>{allTotalPrice?.toLocaleString("en-US")} تومان</p>
              </div>
            </section>
          </section>
        ) : (
          <p className="text-center mt-32">سبد سفارشات ثبت شده شما خالی است</p>
        )}
      </div>

      <Modal
        messageContent="آیا از لغو اطمینان دارید؟"
        isShowModal={isShowDelteModal}
        setIsShowModal={setIsShowDeleteModal}
        confirmOnClick={() =>
          deleteHandler(
            orderId,
            infos?._id,
            setIsShowDeleteModal,
            setRegisteredOrders
          )
        }
      />
    </>
  );
}
