import { ServicesType } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { v4 as uuidv4 } from "uuid";

const addServiceHandler = (
  event: React.FormEvent,
  servicePrice: string,
  serviceName: string,
  setServices: Dispatch<SetStateAction<ServicesType[] | []>>,
  setServiceName: Dispatch<SetStateAction<string>>,
  setServicePrice: Dispatch<SetStateAction<string>>
) => {
  event.preventDefault();
  const regex = /^[0-9]*$/;

  if (!regex.test(servicePrice)) {
    return toast.warn("لطفا قیمت خدمت را با اعداد انگلیسی وارد کنید");
  }

  const newService: ServicesType = {
    id: uuidv4(),
    service_name: serviceName,
    price: servicePrice,
  };
  setServices((prev) => [...prev, newService]);
  setServiceName("");
  setServicePrice("");
};

export default addServiceHandler;
