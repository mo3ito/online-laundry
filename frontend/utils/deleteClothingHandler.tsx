import { Dispatch, SetStateAction } from "react";
import { OrderCardType } from "@/types/context/OrderCard";
import { toast } from "react-toastify";

const deleteClothingHandler = async (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string,
  service_type: string,
  type: string
) => {
  const newOrderList = orders.filter(
    (order) =>
      !(
        order.id === clothingId &&
        order.service_type === service_type &&
        order.type_clothing === type
      )
  );

  if (newOrderList.length < orders.length) {
    setOrders(newOrderList);
    toast.success("سفارش مورد نظر شما حذف شد");
  }
};

export default deleteClothingHandler;
