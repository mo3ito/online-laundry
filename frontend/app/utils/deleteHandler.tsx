import { InformationForDelete, OrderCardType } from "@/types/context/OrderCard";
import { Dispatch, SetStateAction } from "react";

const delteHandler = async (
  orders: OrderCardType[],
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>,
  clothingId: string,
  service_type: string,
  type: string,
  setInformationForDelete: Dispatch<SetStateAction<InformationForDelete>>,
  setIsShowModal: Dispatch<SetStateAction<boolean>>
) => {
  await setInformationForDelete({
    orders,
    setOrders,
    clothingId,
    service_type,
    type,
  });
  setIsShowModal(true);
};

export default delteHandler;
