"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import React, { useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import DefaultButton from "@/components/share/defaultButton";
import updateData from "@/services/updateData";
import { toast } from "react-toastify";
import Modal from "@/components/Modal";

export default function page() {
  const { infos, login } = useAuthContext();
  const [isShowDelteModal, setIsShowDeleteModal] = useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  

  console.log(infos);

  const deleteHandler = async () => {
    const body = {
      orders_id: orderId,
    };

    try {
      
      const response = await updateData(
        "http://localhost:4000/orders/delete-order",
        body,
        infos?._id
      );
      if (response.status === 200) {
        await login(response.data.infos, response.data.token);
        toast.success("سفارش با موفقیت حذف شد");
        setIsShowDeleteModal(false);
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);

      if (error.response && error.response.status === 400) {
        setIsShowDeleteModal(false)
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        toast.error(errorMessage);
      } else {
        setIsShowDeleteModal(false);
        console.log("خطا:", error);
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    }
  };
  const deleteHandlerProccess = (orderId: string) => {
    if (orderId) {
      setOrderId(orderId);
      setIsShowDeleteModal(true);
    }
  };

  console.log(infos?.orders);

  return (
    <>
      {infos ? (
        <div
          style={{ height: `calc(100vh - 248px)` }}
          className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
        >
          <HeaderComponent title="سفارشات ثبت شده" />

          <section className="w-full">
            <ul className="w-full h-max p-6 sm:p-8 ">
              {infos.orders.map((order) => (
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
                      <p className="text-xs sm:text-sm truncate">{order.address}</p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                      <p>وضعیت:</p>
                      <p className="text-zinc-400">در انتظار تحویل</p>
                    </div>
                    <DefaultButton
                      content="لغو"
                      className="w-full h-10 bg-red-300"
                      onClick={() => deleteHandlerProccess(order.orders_id)}
                      
                    />
                  </article>
                </li>
              ))}
            </ul>
          </section>
        </div>
      ) : (
        <LoadingPage />
      )}
      <Modal
        messageContent="آیا از حذف اطمینان دارید؟"
        isShowModal={isShowDelteModal}
        setIsShowModal={setIsShowDeleteModal}
        confirmOnClick={() => deleteHandler()}
      />
    </>
  );
}
