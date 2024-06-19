import { OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const addClothingHandler = (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  id: string,
  service_type: string,
  type_clothing: string,
  count: number,
  cost: number,
  totalCost: number
) => {
  toast.success("سفارش شما با موفقیت اضافه شد");
  console.log(id);
  
  const newOrder: OrderCardType = {
    id,
    service_type,
    type_clothing,
    count,
    cost,
    totalCost,
  };

  const hasSimilarOrder = orders?.some(
    (order) =>
      order.type_clothing === type_clothing && order.service_type === service_type
  );

  if (!hasSimilarOrder) {
    setOrders((prevOrders) => [...prevOrders, newOrder]);
  } else {
    const updatedOrders = orders.map((order) => {
      if (
        order.type_clothing === type_clothing &&
        order.service_type === service_type
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

