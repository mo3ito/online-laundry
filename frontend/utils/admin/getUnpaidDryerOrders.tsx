import { ADMIN_UNPAID_DRYER_ORDERS } from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";

const getUnpaidDryerOrders = async (
  dryerId: string,
  setDryerId: Dispatch<SetStateAction<string>>,
  _id: string | undefined,
  setAllUnpaidDryerOrders: Dispatch<SetStateAction<OrdersTemplate[] | []>>
) => {
  setDryerId(dryerId);
  const body = {
    dryer_id: dryerId,
  };

  try {
    const response = await sendData(ADMIN_UNPAID_DRYER_ORDERS, body, _id);
    if (response.status === 200) {
      setAllUnpaidDryerOrders(response.data);
    }
  } catch (error) {}
};

export default getUnpaidDryerOrders;
