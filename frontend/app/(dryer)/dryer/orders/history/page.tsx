"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";

import { OrdersTemplate } from "@/types/context/Orders";
import LoadingPage from "@/components/Loading/LoadingPage";
import { DRYER_DONE_ORDERS_BY_DRYER } from "@/routeApi/endpoints";

export default function page() {
  const { infos } = useAuthContext();
  const [isShowIsDoneModal, setIsShowIsDoneModal] = useState<boolean>(false);
  const [totalAllServices, setTotalAllServices] = useState<number>(0);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    DRYER_DONE_ORDERS_BY_DRYER,
    ["get recived orders"]
  );

  useEffect(() => {
    if (data) {
      const total = data.data.reduce((sum: number, item: OrdersTemplate) => {
        return (
          sum +
          item.orders.reduce((orderSum, order) => orderSum + order.count, 0)
        );
      }, 0);
      setTotalAllServices(total);
    }
  }, [data]);
  console.log(totalAllServices);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main
      style={{ height: `calc(100vh - 248px)` }}
      className="w-full  bg-slate-100 border border-sky-500  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto pb-10"
    >
      <HeaderComponent as="header" title="تاریخچه سفارشات" />

      <section className="w-full">
        <ul className="w-full h-max p-6 sm:p-8 ">
          <li className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2 p-3 bg-sky-500 rounded-lg text-white">
            <p>تعداد کل خدمات انجام شده</p>
            <p>{totalAllServices}</p>
          </li>
          {data?.data.map((order: OrdersTemplate) => (
            <li
              key={order._id}
              className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base "
            >
              <article>
                <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                  <p>نام خانوادگی</p>
                  <p className="">{order.last_name}</p>
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
                            {Number(item.cost).toLocaleString("en-US")} تومان
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
                      </article>
                    </li>
                  </ul>
                ))}
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
