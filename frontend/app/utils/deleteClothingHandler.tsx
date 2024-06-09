import { Dispatch, SetStateAction } from "react";
import { OrderCardType } from "@/types/context/OrderCard";
import { toast } from "react-toastify";

const deleteClothingHandler = async (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string,
  clothingType: string,
  type: string
) => {
  const newOrderList = orders.filter(
    (order) =>
      !(
        order.id === clothingId &&
        order.serviceType === clothingType &&
        order.typeClothing === type
      )
  );

  if (newOrderList.length < orders.length) {
    setOrders(newOrderList);
    toast.success("سفارش مورد نظر شما حذف شد");
  }
};

export default deleteClothingHandler;
