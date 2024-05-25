import { OrderCardType } from "@/types/context/orderCard";
import { Dispatch, SetStateAction } from "react";

const minesClothingHandler = (
  orders: OrderCardType[],
  id: string,
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  totalNumber: number,
  setTotalNumber: Dispatch<SetStateAction<number>>,
  totalCost: number,
  count: number
) => {
  const isOrder = orders.find((order) => order.id === id);

  if (isOrder) {
    const updatedOrders = orders.map((order) => {
      if (order.id === isOrder.id) {
        const updatedCount = order.count - count <= 0 ? 1 : order.count - count;
        const updateTotalCost = order.totalCost - totalCost;
        return {
          ...order,
          count: updatedCount,
          totalCost: updateTotalCost,
        };
      }
      return order;
    });
    setOrders(updatedOrders);
    if (totalNumber > 0) {
      setTotalNumber((prev) => prev - count);
    } else {
      setTotalNumber(0);
    }
  }
};

export default minesClothingHandler;
