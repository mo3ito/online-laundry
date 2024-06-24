import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";
import sendData from "@/services/sendData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { DRIVER_REGISTER } from "@/routeApi/endpoints";

const submitRegisterHandler = async (
  event: FormEvent,
  nameValue: string,
  lastNameValue: string,
  phoneNumberValue: string,
  passwordValue: string,
  repeatPasswordValue: string,
  setIsLoadingForRegister: Dispatch<SetStateAction<boolean>>,
  login: (infos: InitialInfosType, token: string) => void
) => {
  event.preventDefault();
  const regex = /^[0-9]*$/;
  try {
    const body = {
      name: nameValue,
      last_name: lastNameValue,
      phone_number: phoneNumberValue,
      password: passwordValue,
    };

    if (!nameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خالی است");
    }
    if (!lastNameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خانوادگی خالی است");
    }
    if (!phoneNumberValue.trim()) {
      return toast.warn("مقدار ورودی شماره موبایل خالی است");
    }
    if(phoneNumberValue.length !== 11 ){
      return toast.warn("تعداد کاراکترهای شماره موبایل اشتباه است")
    }
    if(!regex.test(phoneNumberValue)){
      return toast.warn("لطفا شماره موبایل را با اعداد انگلیسی وارد کنید")
    }
    if (!passwordValue) {
      return toast.warn("مقدار ورودی رمز عبور خالی است");
    }
    if (!repeatPasswordValue) {
      return toast.warn("مقدار ورودی  تکرار رمز عبور خالی است");
    }

    if (passwordValue !== repeatPasswordValue) {
      return toast.warn("رمز عبور با تکرار رمز عبور برابر نیست");
    }
    if(passwordValue.length < 6){
      return toast.warn("تعداد کاراکترهای رمز عبور باید بیشتر از ۵ کاراکتر باشد")
    }

    

    setIsLoadingForRegister(true);
    const response = await sendData(DRIVER_REGISTER, body);

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
