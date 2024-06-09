import { OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";

const minesClothingHandler = (
  orders: OrderCardType[],
  id: string,
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  typeClothing: string,
  totalCost: number,
  count: number
) => {
  const isOrder = orders.find((order) => order.id === id);

  if (isOrder) {
    const updatedOrders = orders.map((order) => {
      if (order.id === isOrder.id && order.serviceType === typeClothing) {
        const updatedCount = order.count - count <= 0 ? 1 : order.count - count;
        const updateTotalCost = order.count - count <= 0 ? totalCost : order.totalCost - totalCost;
        return {
          ...order,
          count: updatedCount,
          totalCost: updateTotalCost,
        };
      }
      return order;
    });
    setOrders(updatedOrders);
  }
};

export default minesClothingHandler;
