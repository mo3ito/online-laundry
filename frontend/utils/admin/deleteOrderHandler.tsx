import deleteData from "@/services/deleteData";
import getData from "@/services/getData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const deleteOrderHandler = async (
  orderId: string,
  _id: string | undefined,
  setIsShowModalDeleteGotOrder: Dispatch<SetStateAction<boolean>>,
  setAllData: Dispatch<SetStateAction<OrdersTemplate[] | []>>,
  dleteOrderApi: string,
  getOrderApi: string
) => {
  const body = {
    orderId: orderId,
  };

  try {
    const deleteOrderResponse = await deleteData(dleteOrderApi, body, _id);
    if (deleteOrderResponse.status === 200) {
      const getDataResponse = await getData(getOrderApi, true, undefined, _id);
      if (deleteOrderResponse.status === 200) {
        setAllData(getDataResponse?.data);
        toast.success("حذف سفارش با موفقیت انجام شد");
      } else {
        setIsShowModalDeleteGotOrder(false);
      }
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);
    const errorMessage =
      error.response?.data?.message ||
      "متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
    toast.error(errorMessage);
  } finally {
    setIsShowModalDeleteGotOrder(false);
  }
};

export default deleteOrderHandler;
