import sendData from "@/services/sendData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";

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
  } catch (error) {}
};

export default getpaidAndUnpaidDryerOrders;
