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
import { OrdersForDriver } from "@/types/driver";
import { OrdersType, DataType } from "@/types/driver";
import Modal from "./Modal";
import updateData from "@/services/updateData";
import { toast } from "react-toastify";
import useDriverContext from "@/hooks/useDriverContext";

type DriverOrdersShowProps = {
  apiAddress: string;
  header: string;
  buttonName: string;
  isGet: boolean;
};

export default function DriverOrdersShow({
  apiAddress,
  header,
  buttonName = "عملیات پرداخت",
  isGet = false,
}: DriverOrdersShowProps) {
  const { infos } = useAuthContext();
  const router = useRouter();

  if (!infos || !infos._id) {
    return <LoadingPage />;
  }

  const [OrdersInfo, setOrdersInfo] = useState<DataType | null>(null);
  const [isShowModal, setIsShowModal] = useState<boolean>(false);
  const [ordersForDriver, setOrdersForDriver] = useState([]);
  const { setTotalIsNotDoneOrders } = useDriverContext();
  const [ishowModalGetOrders, setIsShowModalGetOrders] =
    useState<boolean>(false);
  const [isLoadingforApiResponse, setIsLoadingForApiResponse] =
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

  useEffect(() => {
    if (allOrders) {
      setOrdersForDriver(allOrders.data);
    }
  }, [allOrders]);

  const showOrdersAndPay = async (
    orders: OrdersType[],
    allCount: number,
    allPrice: number,
    customer_id: string
  ) => {
    await setOrdersInfo({ orders, allCount, allPrice, customer_id });
    isGet ? setIsShowModalGetOrders(true) : setIsShowModal(true);
  };

  console.log(OrdersInfo?.orders.map((item) => item.orders_id));

  const getOrdersHandler = async () => {
    const ordersIdList = await OrdersInfo?.orders.map((item) => item.orders_id);
    const body = {
      customer_id: OrdersInfo?.customer_id,
      orders_id_list: ordersIdList,
    };
    try {
      setIsLoadingForApiResponse(true);
      const response = await updateData(
        "http://localhost:4000/driver/get-orders-from-customer",
        body,
        infos._id
      );
      if (response.status === 200) {
        const newData = await getData(apiAddress, true, undefined, infos._id);
        if (newData?.status === 200) {
          await setOrdersForDriver(newData.data);
          await setTotalIsNotDoneOrders(newData?.data?.length);
          setIsLoadingForApiResponse(false);
          setIsShowModalGetOrders(false);
          toast.success("تحویل محصول با موفقیت ثبت شد");
        }
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);

      if (error.response && error.response.status === 400) {
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        setIsLoadingForApiResponse(false);
        setIsShowModalGetOrders(false);
        toast.error(errorMessage);
      } else {
        setIsLoadingForApiResponse(false);
        setIsShowModalGetOrders(false);
        console.log("خطا:", error);
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    }
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
      <>
        {ordersForDriver.length > 0 ? (
          <ul className="w-full h-max pt-6 px-6 sm:pt-8 sm:px-8 pb-10">
            {ordersForDriver.map((order: OrdersForDriver) => (
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
                    <DefaultButton
                      content={buttonName}
                      className="w-1/2 max-[280px]:h-6  h-10 bg-sky-500 rounded-lg text-white"
                      onClick={() =>
                        showOrdersAndPay(
                          order.orders,
                          order.all_count,
                          order.all_price,
                          order.customer_id
                        )
                      }
                      isLoading={isLoadingforApiResponse}
                    />
                  </div>
                </article>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center mt-20 max-[280px]:text-sm text-base ">
            {isGet
              ? "هیچ سفارشی برای دریافت وجود ندارد"
              : "هیچ سفارشی برای تحویل وجود ندارد"}
          </p>
        )}
      </>
      <PayModal
        buttonName="پرداخت"
        data={OrdersInfo}
        setIsShowModal={setIsShowModal}
        isShowModal={isShowModal}
        payOnclick={() => console.log("ff")}
      />
      <PayModal
        buttonName="دریافت"
        data={OrdersInfo}
        isShowModal={ishowModalGetOrders}
        setIsShowModal={setIsShowModalGetOrders}
        payOnclick={getOrdersHandler}
      />
    </div>
  );
}
