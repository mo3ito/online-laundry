import { InformationForDelete } from "@/types/context/OrderCard";
import { useEffect, useState } from "react";

const useInformation = () => {
  const [informationForDelete, setInformationForDelete] =
    useState<InformationForDelete>(null);
  const [isTheSameServiceAndType, setIstheSameServiceAndType] =
    useState<boolean>(false);
  useEffect(() => {
    if (
      informationForDelete &&
      informationForDelete.orders &&
      informationForDelete.serviceType
    ) {
      const isTheSameService = informationForDelete?.orders.some(
        (order) =>
          order.serviceType === informationForDelete.serviceType &&
          order.typeClothing === informationForDelete.type
      );
      setIstheSameServiceAndType(isTheSameService);
    }
  }, [informationForDelete]);

  return {
    informationForDelete,
    setInformationForDelete,
    isTheSameServiceAndType,
    
  };
};

export default useInformation;
