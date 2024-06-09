import { Dispatch, SetStateAction } from "react";
import { OrderCardType } from "@/types/context/OrderCard";

const deleteClothingHandler = (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string,
  clothingType: string
) => {
  const newOrderList = orders.filter(
    (order) => order.id === clothingId && order.serviceType !== clothingType
  );
  setOrders(newOrderList);
};

export default deleteClothingHandler;
