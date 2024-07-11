"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { OrdersTemplate } from "@/types/context/Orders";
import React, { useEffect, useState } from "react";
import { ADMIN_GET_ALL_PAID_ORDERS } from "@/routeApi/endpoints";

export default function page() {
  const { infos } = useAuthContext();
  const [allCountOrders, setAllCountOrders] = useState<number>(0);
  const [allTotalPrice, setAllTotalPrice] = useState<number>(0);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_PAID_ORDERS,
    ["get all paid orders"]
  );

  useEffect(() => {
    if (data) {
      const { count, totalCost } = data.data.reduce(
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
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main>
      <ShowHeaderTitleFixed content="مشتریان" />
      {allCountOrders && allTotalPrice && (
        <section className="mt-28 sm:mt-64 px-4 text-sm sm:text-base">
          <p>تعداد کل سفارشات : {allCountOrders} عدد</p>
          <p>مبلغ کل سفارشات : {allTotalPrice.toLocaleString("en-US")} تومان</p>
        </section>
      )}
      <section className="w-full h-max px-4 mt-6 pb-10">
        <ul className="w-full h-max   ">
          {data?.data?.map((order: OrdersTemplate) => (
            <li
              key={order._id}
              className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base "
            >
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
                {order.orders.map((order) => (
                  <ul>
                    <li
                      key={order.orders_id}
                      className="border border-sky-500 p-4 rounded-lg mb-3 bg-sky-200"
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
                          <p>
                            {Number(order.cost).toLocaleString("en-US")} تومان
                          </p>
                        </div>
                        <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                          <p>تعداد:</p>
                          <p>{order.count}</p>
                        </div>
                        <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                          <p>مبلغ:</p>
                          <p>
                            {Number(order.totalCost).toLocaleString("en-US")}{" "}
                            تومان
                          </p>
                        </div>
                        <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                          <p>تاریخ ثبت:</p>
                          <p>{order.created_at}</p>
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
