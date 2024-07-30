"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { OrdersTemplate } from "@/types/context/Orders";
import React, { useEffect, useState } from "react";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import { ShowOrdersForadminProps } from "@/types/admin";
import deleteOrderHandler from "@/utils/admin/deleteOrderHandler";
import useCalculateOrders from "@/hooks/useCalculateOrders";

export default function ShowOrdersForadmin({
  ordersApi,
  isDeleteButton = false,
  dleteOrderApi,
  headersPage,
  emptyMessage,
}: ShowOrdersForadminProps) {
  const { infos } = useAuthContext();

  const [isShowModalDeleteGotOrder, setIsShowModalDeleteGotOrder] =
    useState<boolean>(false);
  const [orderId, setOrderId] = useState<string>("");
  const [allData, setAllData] = useState<OrdersTemplate[] | []>([]);
  const { data, isLoading } = useGetReactQuery(infos?._id, ordersApi, [
    "get all paid orders",
  ]);

  useEffect(() => {
    if (data) {
      setAllData(data.data);
    }
  }, [data]);

  const { allTotalPrice, allCountOrders } = useCalculateOrders(allData);

  console.log(allData);

  const handleDeleteOrder = async (orderId: string) => {
    await setOrderId(orderId);
    setIsShowModalDeleteGotOrder(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="mt-32 md:mt-64  pb-10">
      <ShowHeaderTitleFixed content={headersPage} />

      <section className=" px-4 text-sm sm:text-base">
        <div className={allCountOrders && allTotalPrice ? "block" : "hidden"}>
          <p className="">تعداد سفارشات : {allData.length} عدد</p>
          <p className="">تعداد کل لباس‌ها در سفارشات : {allCountOrders} عدد</p>
          <p>مبلغ کل سفارشات : {allTotalPrice.toLocaleString("en-US")} تومان</p>
        </div>
      </section>

      {allData.length > 0 ? (
        <section className="w-full h-max px-4 mt-6">
          <ul className="w-full h-max   ">
            {allData?.map((order: OrdersTemplate) => (
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
      ) : (
        <p className="text-center pt-20 max-[280px]:text-sm text-base sm:text-lg">
          {" "}
          {emptyMessage}{" "}
        </p>
      )}
      {isDeleteButton && (
        <Modal
          messageContent="آیا از حذف اطمینان دارید؟"
          isShowModal={isShowModalDeleteGotOrder}
          setIsShowModal={setIsShowModalDeleteGotOrder}
          confirmOnClick={() =>
            deleteOrderHandler(
              orderId,
              infos?._id,
              setIsShowModalDeleteGotOrder,
              setAllData,
              dleteOrderApi,
              ordersApi
            )
          }
        />
      )}
    </main>
  );
}
