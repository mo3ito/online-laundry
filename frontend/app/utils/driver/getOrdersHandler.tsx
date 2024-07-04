import getData from "@/services/getData";
import updateData from "@/services/updateData";
import { DataType, OrdersForDriver } from "@/types/driver";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { OrdersTemplate } from "@/types/driver";
import { DRIVER_GET_ALL_ORDERS_FROM_CUSTOMER } from "@/routeApi/endpoints";

const getOrdersHandler = async (
  ordersInfo: DataType | null,
  setIsLoadingForApiResponse: Dispatch<SetStateAction<boolean>>,
  apiAddress: string,
  _id: string,
  setOrdersForDriver: Dispatch<SetStateAction<OrdersTemplate[]>> ,
  setTotalIsNotDoneOrders: Dispatch<SetStateAction<number>>,
  setIsShowModalGetOrders: Dispatch<SetStateAction<boolean>>
) => {
  const ordersIdList = await ordersInfo?.orders.map((item) => item.orders_id);
  const body = {
    customer_id: ordersInfo?.customer_id,
    orders_id_list: ordersIdList,
  };
  try {
    setIsLoadingForApiResponse(true);
    const response = await updateData(
      DRIVER_GET_ALL_ORDERS_FROM_CUSTOMER,
      body,
      _id
    );
    if (response.status === 200 ) {
      const newData = await getData(apiAddress, true, undefined, _id);
      if (newData?.status === 200) {
        await setOrdersForDriver(newData.data);
        await setTotalIsNotDoneOrders(newData.data.length);
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

export default getOrdersHandler;
