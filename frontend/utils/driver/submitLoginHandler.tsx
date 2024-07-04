import sendData from "@/services/sendData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";


const submitLoginHandler = async (
  event: FormEvent,
  phoneNumberValue: string,
  passwordValue: string,
  login: (infos: InitialInfosType, token: string) => void,
  setIsLoadingForLogin: Dispatch<SetStateAction<boolean>>,
  router: AppRouterInstance,
  apiAddress: string,
  pathRoute: string
) => {
  event.preventDefault();
  const regex = /^[0-9]*$/;
  try {
    const body = {
      phone_number: phoneNumberValue,
      password: passwordValue,
    };

    if (!phoneNumberValue.trim()) {
      return toast.warn("مقدار ورودی شماره موبایل خالی است");
    }
    if (phoneNumberValue.length !== 11) {
      return toast.warn("تعداد کاراکترهای شماره موبایل اشتباه است");
    }
    if (!regex.test(phoneNumberValue)) {
      return toast.warn("لطفا شماره موبایل را با اعداد انگلیسی وارد کنید");
    }
    if (!passwordValue) {
      return toast.warn("مقدار ورودی رمز عبور خالی است");
    }


    setIsLoadingForLogin(true)
    const response = await sendData(apiAddress, body);
    if (response.status === 200) {
      await login(response.data.infos, response.data.token);
      setIsLoadingForLogin(false);
      router.push(pathRoute);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForLogin(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForLogin(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default submitLoginHandler;
