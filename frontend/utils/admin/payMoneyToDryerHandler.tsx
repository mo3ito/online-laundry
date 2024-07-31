import {
  ADMIN_PAY_DRYER_ORDERS,
  ADMIN_UNPAID_DRYER_ORDERS,
} from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import getpaidAndUnpaidDryerOrders from "./getUnpaidDryerOrders";

const payMoneyToDryerHandler = async (
  dryerId: string,
  setDryerId: Dispatch<SetStateAction<string>>,
  ordersId: string[],
  setAllUnpaidDryerOrders: Dispatch<SetStateAction<OrdersTemplate[] | []>>,
  _id: string | undefined,
  onToggleShowMadalPayMoney: (value: boolean) => unknown
) => {
  const body = {
    dryer_id: dryerId,
    orders_id_array: ordersId,
  };

  try {
    const payMoneyResponse = await sendData(ADMIN_PAY_DRYER_ORDERS, body, _id);
    if (payMoneyResponse.status === 200) {
      console.log(payMoneyResponse);
      await setAllUnpaidDryerOrders(payMoneyResponse.data);
      await getpaidAndUnpaidDryerOrders(
        dryerId,
        setDryerId,
        _id,
        setAllUnpaidDryerOrders,
        ADMIN_UNPAID_DRYER_ORDERS
      );
      toast.success("پرداخت با موفقیت ثبت شد");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } finally {
    onToggleShowMadalPayMoney(false);
  }
};

export default payMoneyToDryerHandler;
