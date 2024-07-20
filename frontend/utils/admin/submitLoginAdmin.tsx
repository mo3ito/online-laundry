import sendData from "@/services/sendData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { FormEvent} from "react";
import { toast } from "react-toastify";

const submitLoginAdmin = async (
  event: FormEvent,
  phoneNumberValue: string,
  passwordValue: string,
  usernameValue: string,
  adminKeyValue: string,
  login: (infos: InitialInfosType, token: string) => void,
  onToggleLoading: (value : boolean)=> unknown,
  apiAddress: string,
  pathRoute: string
) => {
  event.preventDefault();
  const regex = /^[0-9]*$/;
  try {
    const body = {
      phone_number: phoneNumberValue,
      password: passwordValue,
      admin_key: adminKeyValue,
      username: usernameValue,
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
    if (!usernameValue.trim()) {
      return toast.warn("مقدار ورودی نام‌ کاربری خالی است");
    }
    if (!adminKeyValue) {
      return toast.warn("مقدار ورودی کلید ادمین خالی است");
    }

    onToggleLoading(true);
    const response = await sendData(apiAddress, body);
    if (response.status === 200) {
      login(response.data.infos, response.data.token);
      onToggleLoading(false);
      window.location.href = pathRoute;
    } else {
      onToggleLoading(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      onToggleLoading(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      onToggleLoading(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default submitLoginAdmin;
