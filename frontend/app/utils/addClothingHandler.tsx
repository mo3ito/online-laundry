import { OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";

const addClothingHandler = (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  id: string,
  serviceType: string,
  typeClothing: string,
  count: number,
  cost: number,
  totalCost: number
) => {
    
  const newOrder: OrderCardType = {
    id,
    serviceType,
    typeClothing,
    count,
    cost,
    totalCost,
  };

  const hasSimilarOrder = orders?.some(
    (order) =>
      order.typeClothing === typeClothing && order.serviceType === serviceType
  );

  if (!hasSimilarOrder) {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  } else {
    const updatedOrders = orders.map((order) => {
      if (
        order.typeClothing === typeClothing &&
        order.serviceType === serviceType
      ) {
        return {
          ...order,
          count: order.count + count,
          totalCost: order.totalCost + cost,
        };
      }
      return order;
    });
    setOrders(updatedOrders);
  }
};

export default addClothingHandler;
