import deleteData from "@/services/deleteData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";
import getpaidAndUnpaidDryerOrders from "./getUnpaidDryerOrders";
import { toast } from "react-toastify";

const deleteMoneyPaidAndUnpaidToDryersOrders = async (
  dryerId: string,
  setDryerId: Dispatch<SetStateAction<string>>,
  ordersId: string[],
  setOrdersId: Dispatch<SetStateAction<string[]| []>>,
  _id: string | undefined,
  apiAddressDelete: string,
  setAllOrders: Dispatch<SetStateAction<OrdersTemplate[] | []>>,
  apiAddresGetOrders: string,
  onToggleShowModal: (value: boolean) => unknown
) => {
  const body = {
    dryer_id: dryerId,
    orders_id_array: ordersId,
  };

  try {
    const deleteResponse = await deleteData(apiAddressDelete, body, _id);
    if (deleteResponse.status === 200) {
      console.log(deleteResponse);

      await setAllOrders(deleteResponse.data);
      await getpaidAndUnpaidDryerOrders(
        dryerId,
        setDryerId,
        _id,
        setAllOrders,
        apiAddresGetOrders
      );
      setOrdersId([])
      toast.success("سفارش با موفقیت حذف شد");
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
    onToggleShowModal(false);
  }
};

export default deleteMoneyPaidAndUnpaidToDryersOrders;
