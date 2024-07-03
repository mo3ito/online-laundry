import getData from "@/services/getData";
import updateData from "@/services/updateData";
import { DataType, OrdersForGetAndSendDriver } from "@/types/driver";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { DRIVER_PAY_ORDERS_MONEY } from "@/routeApi/endpoints";

const payOrderMoneyHandler = async (
  ordersInfo: DataType | null,
  setIsLoadingForApiResponse: Dispatch<SetStateAction<boolean>>,
  apiAddress: string,
  _id: string,
  setOrdersForDriver: Dispatch<SetStateAction<OrdersForGetAndSendDriver[]>>,
  setTotalIsDoneOrders: Dispatch<SetStateAction<number>>,
  setIsShowModalSendOrder: Dispatch<SetStateAction<boolean>>
) => {
  const ordersIdList = await ordersInfo?.orders.map((item) => item.orders_id);
  const body = {
    customer_id: ordersInfo?.customer_id,
    orders_id_list: ordersIdList,
  };

  try {
    const responsePayMoney = await updateData(
      DRIVER_PAY_ORDERS_MONEY,
      body,
      _id
    );
    if (responsePayMoney.status === 200) {
      const newData = await getData(apiAddress, true, undefined, _id);
      if (newData?.status === 200) {
        await setOrdersForDriver(newData.data);
        await setTotalIsDoneOrders(newData.data.length);
        setIsLoadingForApiResponse(false);
        setIsShowModalSendOrder(false);
        toast.success("پرداخت با موفقیت ثبت شد");
      }
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      setIsLoadingForApiResponse(false);
      setIsShowModalSendOrder(false);
      toast.error(errorMessage);
    } else {
      setIsLoadingForApiResponse(false);
      setIsShowModalSendOrder(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default payOrderMoneyHandler;
