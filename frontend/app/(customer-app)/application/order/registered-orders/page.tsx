"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import React, { useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import deleteHandler from "@/utils/orders/deleteHandler";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { useRouter } from "next/navigation";
import { GET_ORDERS_CUSTOER } from "@/routeApi/endpoints";
import { OrdersRegistered } from "@/types/context/OrderCard";
import useOrderCardContext from "@/hooks/useOrderCardContext";

export default function page() {
  const { infos, login } = useAuthContext();
  const [isShowDelteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const router = useRouter();
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

  console.log(registeredOrders);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <div
        style={{ height: `calc(100vh - 248px)` }}
        className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
      >
        <HeaderComponent title="سفارشات ثبت شده" />

        {registeredOrders?.length ? (
          <section className="w-full">
            <ul className="w-full h-max p-6 sm:p-8 ">
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
