import updateData from "@/services/updateData";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { DELETE_ORDER, GET_ORDERS_CUSTOER } from "@/routeApi/endpoints";
import { OrdersRegistered } from "@/types/context/OrderCard";
import getData from "@/services/getData";

const deleteHandler = async (
  orderId: string,
  _id: string | undefined,
  setIsShowDeleteModal: Dispatch<SetStateAction<boolean>>,
  setRegisteredOrders: Dispatch<SetStateAction<OrdersRegistered[] | null>>
) => {
  const body = {
    orders_id: orderId,
  };

  try {
    const response = await updateData(DELETE_ORDER, body, _id);
    if (response.status === 200) {
      const getOrdersResponse = await getData(
        GET_ORDERS_CUSTOER,
        true,
        undefined,
        _id
      );
      if (getOrdersResponse?.status === 200) {
       await setRegisteredOrders(getOrdersResponse?.data);
        toast.success("سفارش با موفقیت حذف شد");
        setIsShowDeleteModal(false);
      }
    
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowDeleteModal(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowDeleteModal(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default deleteHandler;
