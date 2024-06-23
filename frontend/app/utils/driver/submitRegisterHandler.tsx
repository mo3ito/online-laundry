import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";
import sendData from "@/services/sendData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { CUSTOMER_EDIT_INFORMATION } from "@/routeApi/endpoints";

const submitRegisterHandler = async (
  event: FormEvent,
  nameValue: string,
  lastNameValue: string,
  phoneNumberValue: string,
  setIsLoadingForRegister: Dispatch<SetStateAction<boolean>>,
  login: (infos: InitialInfosType, token: string) => void
) => {
  event.preventDefault();

  try {
    const body = {
      name: nameValue,
      last_name: lastNameValue,
      phone_number: phoneNumberValue,
    };

    if (!nameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خالی است");
    }
    if (!lastNameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خانوادگی خالی است");
    }
    if(!phoneNumberValue.trim()){
        return toast.warn("مقدار ورودی شماره موبایل خالی است")
    }

    setIsLoadingForRegister(true);
    const response = await sendData(
      "http://localhost:4000/driver/register",
      body
    );

    if (response.status === 200) {
      await login(response.data.infos, response.data.token);
      setIsLoadingForRegister(false);
      toast.success("ثبت‌نام با موفقیت انجام شد");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForRegister(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForRegister(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default submitRegisterHandler;
