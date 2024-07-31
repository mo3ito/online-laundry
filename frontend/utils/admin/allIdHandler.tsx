import { OrdersTemplate } from "@/types/context/Orders";
import { Dispatch, SetStateAction } from "react";

const allIdHandler = (
  ordersId: string[] | [],
  setOrdersId: Dispatch<SetStateAction<string[] | []>>,
  allOrders: OrdersTemplate[]
) => {
  if (ordersId.length === allOrders.length) {
    setOrdersId([]);
  } else {
    setOrdersId(allOrders.map((item: OrdersTemplate) => item._id));
  }
};

export default allIdHandler;
