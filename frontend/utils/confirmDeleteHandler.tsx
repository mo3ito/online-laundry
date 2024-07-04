import { Dispatch, SetStateAction } from "react";
import deleteClothingHandler from "./deleteClothingHandler";
import { InformationForDelete } from "@/types/context/OrderCard";

const confirmDeleteHandler =  (
  informationForDelete: InformationForDelete,
  setInformationForDelete: Dispatch<
    SetStateAction<InformationForDelete | null>
  >,
  setIsShowModal: Dispatch<SetStateAction<boolean>>
) : void => {
  if (informationForDelete) {
    deleteClothingHandler(
      informationForDelete.orders,
      informationForDelete.setOrders,
      informationForDelete.clothingId,
      informationForDelete.service_type,
      informationForDelete.type
    );
    setInformationForDelete(null);
    setIsShowModal(false);
  }
};

export default confirmDeleteHandler;
