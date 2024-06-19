import { OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const minesClothingHandler = (
  orders: OrderCardType[],
  id: string,
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  type_clothing: string,
  cost: number,
  count: number
) => {
  const isOrder = orders.find((order) => order.id === id);

  if (isOrder) {
    const updatedOrders = orders.map((order) => {
      if (order.id === isOrder.id && order.service_type === type_clothing) {
        const updatedCount = order.count - count <= 0 ? 1 : order.count - count;
        const updateTotalCost =
          order.count - count <= 0 ? cost : order.totalCost - cost;
        if (order.count > 1) {
          toast.success("سفارش شما با موفقیت کاسته شد");
        }
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


