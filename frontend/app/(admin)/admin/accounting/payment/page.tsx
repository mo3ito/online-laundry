"use client";
import React, { useEffect, useState } from "react";
import LoadingPage from "@/components/Loading/LoadingPage";
import Modal from "@/components/Modal";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { ADMIN_GET_ALL_VERIFY_DRYERS } from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import { DryerTypes } from "@/types/admin";
import { OrdersTemplate } from "@/types/context/Orders";
import useCalculateOrders from "@/hooks/useCalculateOrders";
import { toast } from "react-toastify";
import getUnpaidDryerOrders from "@/utils/admin/getUnpaidDryerOrders";
import payMoneyToDryerHandler from "@/utils/admin/payMoneyToDryerHandler";

export default function payment() {
  const { infos } = useAuthContext();
  const [isShowModalDeleteDryer, setIsShowModalDeleteDryer] =
    useState<boolean>(false);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_VERIFY_DRYERS,
    ["get all verified dryers"]
  );
  const [allDryers, setAllDryers] = useState<DryerTypes[] | []>([]);

  const [allUnpaidDryerOrders, setAllUnpaidDryerOrders] = useState<
    OrdersTemplate[] | []
  >([]);
  const [isShowModalPayMoney, setIsShowModalPayMoney] =
    useState<boolean>(false);
  const [dryerId, setDryerId] = useState<string>("");
  const [ordersId, setOrdersId] = useState<string[]>([]);

  useEffect(() => {
    if (data) {
      setAllDryers(data.data);
    }
  }, [data]);

  const { allTotalPrice, allCountOrders } =
    useCalculateOrders(allUnpaidDryerOrders);

  console.log(ordersId);

  const handleCheckboxChange = (orderId: string) => {
    setOrdersId((prevOrdersId: string[]) => {
      if (prevOrdersId.includes(orderId)) {
        return prevOrdersId.filter((id) => id !== orderId);
      } else {
        return [...prevOrdersId, orderId];
      }
    });
  };

  const allIdHandler = () => {
    if (ordersId.length === allUnpaidDryerOrders.length) {
      setOrdersId([]);
    } else {
      setOrdersId(allUnpaidDryerOrders.map((item: OrdersTemplate) => item._id));
    }
  };

  const handlePayMoneyToDryer = () => {
    ordersId.length > 0
      ? setIsShowModalPayMoney(true)
      : toast.warn("شما سفارشی را برای پرداخت انتخاب نکرده‌اید");
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container  h-max min-h-screen mx-auto  flex flex-col items-center  pb-20 px-4 mt-28 md:mt-58">
      <ShowHeaderTitleFixed content="تسویه با خشکشویی" />
      <section className="w-full h-max sticky top-28 md:top-56 bg-slate-100 pb-3 md:py-3 z-40">
        <select
          onChange={(event) =>
            getUnpaidDryerOrders(
              event?.target.value,
              setDryerId,
              infos?._id,
              setAllUnpaidDryerOrders
            )
          }
          className="w-full z-50 h-10 rounded-lg mb-3 outline-none px-2 border border-sky-500 text-zinc-500 bg-white"
          name=""
          id=""
        >
          <option value="">خشکشویی را انتخاب کنید</option>
          {allDryers.map((item) => (
            <option value={item._id}>
              {`${item.name} ${item.last_name} (خشکشویی ${item.laundry_name})`}
            </option>
          ))}
        </select>
        <div className="w-full flex items-center gap-x-2 ">
          <DefaultButton
            content="انتخاب همه"
            className="w-1/2 bg-sky-300 h-10 rounded-lg"
            onClick={allIdHandler}
          />
          <DefaultButton
            content="تسویه"
            className="w-1/2 bg-sky-300 h-10 rounded-lg"
            onClick={handlePayMoneyToDryer}
          />
        </div>
      </section>
      <div className=" md:mt-28  w-full">
        <section className="max-[280px]:text-xs text-sm sm:text-base">
          <div className={allCountOrders && allTotalPrice ? "block" : "hidden"}>
            <p className="">
              تعداد سفارشات : {allUnpaidDryerOrders.length} عدد
            </p>
            <p className="">
              تعداد کل لباس‌ها در سفارشات : {allCountOrders} عدد
            </p>
            <p>
              مبلغ کل سفارشات : {allTotalPrice.toLocaleString("en-US")} تومان
            </p>
          </div>
        </section>

        <section className="w-full h-max mt-6 ">
          {allUnpaidDryerOrders.length > 0 ? (
            <ul className="w-full h-max   ">
              {allUnpaidDryerOrders?.map((order: OrdersTemplate) => (
                <li
                  key={order._id}
                  className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-8 shadow-xl max-[280px]:text-xs text-sm sm:text-base "
                >
                  <input
                    onChange={() => handleCheckboxChange(order._id)}
                    className="size-5"
                    type="checkbox"
                    checked={ordersId.includes(order._id)}
                  />
                  <article>
                    <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                      <p>نام</p>
                      <p className="">
                        {order.name} {order.last_name}
                      </p>
                    </div>
                    <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                      <p>شماره موبایل</p>
                      <p className="">{order.phone_number}</p>
                    </div>
                    <header className="text-center my-3">سفارشات</header>
                    {order.orders.map((item) => (
                      <ul>
                        <li
                          key={item.orders_id}
                          className="border border-sky-500 p-4 rounded-lg mb-3 bg-sky-200"
                        >
                          <article>
                            <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                              <p>نوع لباس:</p>
                              <p className="">{item.type_clothing}</p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>نوع خدمات:</p>
                              <p>{item.service_type}</p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>مبلغ واحد:</p>
                              <p>
                                {Number(item.cost).toLocaleString("en-US")}{" "}
                                تومان
                              </p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>تعداد:</p>
                              <p>{item.count}</p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>مبلغ:</p>
                              <p>
                                {Number(item.totalCost).toLocaleString("en-US")}{" "}
                                تومان
                              </p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>تاریخ ثبت:</p>
                              <p>{item.created_at}</p>
                            </div>
                            <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                              <p>آدرس:</p>
                              <p>{item.address}</p>
                            </div>
                            <section className="w-full h-max bg-sky-300 p-2 mb-2 rounded-lg">
                              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                                <p>نام خشکشویی</p>
                                <p>{order?.service_laundry?.laundry_name}</p>
                              </div>
                              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                                <p>آدرس خشکشویی</p>
                                <p>{order?.service_laundry?.laundry_address}</p>
                              </div>
                            </section>
                          </article>
                        </li>
                      </ul>
                    ))}
                  </article>
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-center text-sm sm:text-lg">
              هیچ سفارشی برای تسویه وجود ندارد
            </p>
          )}
        </section>
      </div>
      <Modal
        messageContent="آیا از تسویه اطمینان دارید؟"
        isShowModal={isShowModalPayMoney}
        setIsShowModal={setIsShowModalPayMoney}
        confirmOnClick={() =>
          payMoneyToDryerHandler(
            dryerId,
            setDryerId,
            ordersId,
            setAllUnpaidDryerOrders,
            infos?._id,
            (value) => setIsShowModalPayMoney(value)
          )
        }
      />
    </div>
  );
}
