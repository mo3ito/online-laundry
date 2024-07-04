"use client";
import DefaultButton from "@/components/share/defaultButton";
import React, { useEffect, useState } from "react";
import getData from "@/services/getData";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { OrdersForGetAndSendDriver } from "@/types/driver";

export default function page() {
  const { infos } = useAuthContext();
  const [allOrders, setAllOrders] = useState([]);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    "http://localhost:4000/dryer/orders-for-dryer",
    ["get recived orders"]
  );

  useEffect(() => {
    if (data) {
      setAllOrders(data.data);
    }
  }, [data]);

  console.log(allOrders);

  return (
    <main
      style={{ height: `calc(100vh - 248px)` }}
      className="w-full  bg-slate-100 border border-sky-500  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto pb-10"
    >
      <section className="w-full">
        <ul className="w-full h-max p-6 sm:p-8 ">
          {allOrders?.map((order: OrdersForGetAndSendDriver) => (
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
                <h1 className="text-center my-3">سفارشات</h1>
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

                        <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                          <p>وضعیت:</p>
                          <p className="text-zinc-400">{order.situation}</p>
                        </div>
                      </article>
                    </li>
                  </ul>
                ))}

                <DefaultButton
                  className="w-full h-12 !bg-sky-500 text-white rounded-lg"
                  content="انجام شده "
                />
              </article>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}
