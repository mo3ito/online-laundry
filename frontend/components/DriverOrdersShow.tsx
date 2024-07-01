"use client";
import React, { useEffect, useState } from "react";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import DefaultButton from "@/components/share/defaultButton";
import getData from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import { useRouter } from "next/navigation";
import PayModal from "./PayModal";
import { OrdersForDriver , DriverOrdersShowProps } from "@/types/driver";
import { OrdersType, DataType } from "@/types/driver";
import Modal from "./Modal";



export default function DriverOrdersShow({
  apiAddress,
  header,
  isGet,
}: DriverOrdersShowProps) {
  const { infos } = useAuthContext();
  const router = useRouter();

  if (!infos || !infos._id) {
    return <LoadingPage />;
  }

  const [OrdersInfo, setOrdersInfo] = useState<DataType | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [isShowModalGetOrders, setIsShowModalGetOrders] =
    useState<boolean>(false);
  const queryKey = ["all-orders"];
  const { data: allOrders, isLoading } = useQuery({
    queryKey: infos._id ? queryKey : [],
    queryFn: () => getData(apiAddress, true, undefined, infos._id),
  });

  const latLongHandler = (latitude: string, longitude: string) => {
    router.push(
      `/driver/location?latitude=${latitude}&&longitude=${longitude}`
    );
  };

  const showOrdersAndPay = async (
    orders: OrdersType[],
    allCount: number,
    allPrice: number
  ) => {
    await setOrdersInfo({ orders, allCount, allPrice });
    setIsShowModal(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  console.log(OrdersInfo);

  return (
    <div
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <HeaderComponent title={header} />
      <ul className="w-full h-max pt-6 px-6 sm:pt-8 sm:px-8 pb-10">
        {allOrders?.data.map((order: OrdersForDriver) => (
          <li
            key={order._id}
            className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base"
          >
            <article>
              <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                <p>نام</p>
                <p className="">{order.name}</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>نام خانوادگی</p>
                <p>{order.last_name}</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>شماره موبایل</p>
                <p>{order.phone_number}</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>آدرس</p>
                <p>{order.address}</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>تعداد کل سفارشات</p>
                <p>{order.all_count}</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>مبلغ کل سفارشات</p>
                <p>{order.all_price.toLocaleString("en-US")} تومان</p>
              </div>
              <div className="w-full flex items-center justify-center max-[280px]:gap-x-2 gap-x-3 ">
                <DefaultButton
                  content="نمایش آدرس"
                  className="w-1/2 max-[280px]:h-6 h-10 !bg-pink-500 rounded-lg text-white"
                  onClick={() =>
                    latLongHandler(order.latitude, order.longitude)
                  }
                />

                {!isGet ? (
                  <DefaultButton
                    content="پرداخت"
                    className="w-1/2 max-[280px]:h-6  h-10 bg-sky-500 rounded-lg text-white"
                    onClick={() =>
                      showOrdersAndPay(
                        order.orders,
                        order.all_count,
                        order.all_price
                      )
                    }
                  />
                ) : (
                  <DefaultButton
                    content="دریافت"
                    className="w-1/2 max-[280px]:h-6  h-10 bg-sky-500 rounded-lg text-white"
                    onClick={() => setIsShowModalGetOrders(true)}
                  />
                )}
              </div>
            </article>
          </li>
        ))}
      </ul>
      <PayModal
        data={OrdersInfo}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
      />
      <Modal
        messageContent="آیا سفارشات را از مشتری دریافت کردید؟"
        isShowModal={isShowModalGetOrders}
        setIsShowModal={setIsShowModalGetOrders}
        confirmOnClick={() => console.log("f")}
      />
    </div>
  );
}
