import sendData from "@/services/sendData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const getpaidAndUnpaidDryerOrders = async (
  dryerId: string,
  setDryerId: Dispatch<SetStateAction<string>>,
  _id: string | undefined,
  setAllOrders: Dispatch<SetStateAction<OrdersTemplate[] | []>>,
  apiAddress: string
) => {
  setDryerId(dryerId);
  const body = {
    dryer_id: dryerId,
  };

  try {
    const response = await sendData(apiAddress, body, _id);
    if (response.status === 200) {
      setAllOrders(response.data);
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
  }
};

export default getpaidAndUnpaidDryerOrders;
