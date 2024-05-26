import { Dispatch, SetStateAction } from "react";
import { OrderCardType } from "@/types/context/orderCard";

const deleteClothingHandler = (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string
) => {
  const newOrderList = orders.filter((order) => order.id !== clothingId);
  setOrders(newOrderList);
};

export default deleteClothingHandler;
