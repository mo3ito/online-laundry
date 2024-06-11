import { InformationForDelete, OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";

const delteHandler = async (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string,
  serviceType: string,
  type: string,
  setInformationForDelete: Dispatch<SetStateAction<InformationForDelete>>,
  setIsShowModal: Dispatch<SetStateAction<boolean>>
) => {
  await setInformationForDelete({
    orders,
    setOrders,
    clothingId,
    serviceType,
    type,
  });
  setIsShowModal(true);
};

export default delteHandler;
