"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import Modal from "@/components/Modal";
import ShowOrdersForadmin from "@/components/admin/ShowOrdersForAdmin";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import {
  ADMIN_GET_ALL_VERIFY_DRYERS,
} from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import { DryerTypes } from "@/types/admin";
import { OrdersTemplate } from "@/types/context/Orders";
import deleteOrderHandler from "@/utils/admin/deleteOrderHandler";
import React, { useEffect, useState } from "react";

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
  const [dryerId, setDryerId] = useState<string>("");
  const [allUnpaidDryerOrders, setAllUnpaidDryerOrders] = useState([]);
  const [allCountOrders, setAllCountOrders] = useState<number>(0);
  const [allTotalPrice, setAllTotalPrice] = useState<number>(0);
  const [isShowModalDeleteGotOrder, setIsShowModalDeleteGotOrder] =
    useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");

  useEffect(() => {
    if (data) {
      setAllDryers(data.data);
    }
  }, [data]);

  console.log(dryerId);

  const getUnpaidDryerOrders = async (dryerId: string) => {
    const body = {
      dryer_id: dryerId,
    };

    try {
      const response = await sendData(
        "http://localhost:4000/admin/unpaid-dryer-orders",
        body,
        infos?._id
      );
      if (response.status === 200) {
        setAllUnpaidDryerOrders(response.data);
      }
    } catch (error) {}
  };

  useEffect(() => {
    if (allUnpaidDryerOrders) {
      const { count, totalCost } = allUnpaidDryerOrders.reduce(
        (
          acc: { count: number; totalCost: number },
          customer: OrdersTemplate
        ) => {
          const customerOrderCount = customer.orders.reduce(
            (orderAcc, order) => {
              return {
                count: orderAcc.count + order.count,
                totalCost: orderAcc.totalCost + order.totalCost,
              };
            },
            { count: 0, totalCost: 0 }
          );

          return {
            count: acc.count + customerOrderCount.count,
            totalCost: acc.totalCost + customerOrderCount.totalCost,
          };
        },
        { count: 0, totalCost: 0 }
      );

      setAllCountOrders(count);
      setAllTotalPrice(totalCost);
    }
  }, [allUnpaidDryerOrders]);

  const handleDeleteOrder = async (orderId: string) => {
    await setOrderId(orderId);
    setIsShowModalDeleteGotOrder(true);
  };

  console.log(allUnpaidDryerOrders);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <div className="container  h-max min-h-screen mx-auto  flex flex-col items-center  pb-20 px-4 mt-28 md:mt-58">
      <ShowHeaderTitleFixed content="تسویه با خشکشویی" />
      <section className="w-full h-max sticky top-28 md:top-56 bg-slate-200 pb-3 md:py-3 z-40">
  <select
    onChange={(event) => getUnpaidDryerOrders(event?.target.value)}
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
              <DefaultButton content="انتخاب همه" className="w-1/2 bg-sky-500 h-10 rounded-lg"/>
              <DefaultButton content="تسویه" className="w-1/2 bg-sky-500 h-10 rounded-lg"/>
            </div>
</section>
      <div className=" md:mt-28 bg-yellow-200 w-full">
          <section className=" text-sm sm:text-base">
            <div
              className={allCountOrders && allTotalPrice ? "block" : "hidden"}
            >
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

          <section className="w-full h-max px-4 mt-6">
            <ul className="w-full h-max   ">
              {allUnpaidDryerOrders?.map((order: OrdersTemplate) => (
                <li
                  key={order._id}
                  className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base "
                >
                  <input className="size-5" type="checkbox" />
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
                  {
                    <DefaultButton
                      content="حذف"
                      className="!bg-red-400 w-full h-10 rounded-lg"
                      onClick={() => handleDeleteOrder(order._id)}
                    />
                  }
                </li>
              ))}
            </ul>
          </section>
        
      </div>
    </div>
  );
}
