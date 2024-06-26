import { GET_ORDERS_CUSTOER, SEND_ORDERS } from "@/routeApi/endpoints";
import getData from "@/services/getData";
import sendData from "@/services/sendData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { OrderCardType } from "@/types/context/OrderCard";
import { LatLongType } from "@/types/neshan-map";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const confirmAddressHandler = async (
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  infos: InitialInfosType | null,
  latLong: LatLongType,
  setTotalNumber: Dispatch<SetStateAction<number>>,
  login: (infos: InitialInfosType, token: string) => void,
  router: AppRouterInstance
) => {
  try {
    if (orders.length === 0) {
      return toast.error("شما سفارشی ثبت نکرده‌اید");
    }
    setIsLoading(true);
    const addressResponse = await getData(
      `https://api.neshan.org/v5/reverse?lat=${latLong.latitude}&lng=${latLong.longitude}`,
      true,
      process.env.NEXT_PUBLIC_MAP_API_KEY
    );
    if (addressResponse?.status === 200) {
      const body = {
        customer_id: infos?._id,
        name: infos?.name,
        last_name: infos?.last_name,
        phone_number: infos?.phone_number,
        orders: orders,
        address: addressResponse.data.formatted_address,
        latitude: latLong.latitude,
        longitude: latLong.longitude,
      };
      const sendOrderResponse = await sendData(SEND_ORDERS, body, infos?._id);

      if (sendOrderResponse.status === 200) {
        const getRegisteredOrdersResponse = await getData(
          GET_ORDERS_CUSTOER,
          true,
          undefined,
          infos?._id
        );
        if (getRegisteredOrdersResponse?.status === 200) {
          await login(
            getRegisteredOrdersResponse.data.infos,
            getRegisteredOrdersResponse.data.token
          );
          setIsLoading(false);
          await setTotalNumber(0);
          setOrders([]);
          router.push("/application/order/registered-orders");
        }
      }
    }
  } catch (error: any) {
   
    console.error("خطا در ارتباط با سرور:", error);
    setIsLoading(false);
    if (error.response && error.response.status === 400) {
      setIsLoading(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoading(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default confirmAddressHandler;
