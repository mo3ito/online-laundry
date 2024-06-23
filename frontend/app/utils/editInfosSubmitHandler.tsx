import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";
import updateData from "@/services/updateData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { CUSTOMER_EDIT_INFORMATION } from "@/routeApi/endpoints";

const editInfosSubmitHandler = async (
  event: FormEvent,
  nameValue: string | undefined,
  lastNameValue: string | undefined,
  setIsLoadingForEdit: Dispatch<SetStateAction<boolean>>,
  login: (infos: InitialInfosType, token: string) => void,
  _id: string | undefined
) => {
  event.preventDefault();

  try {
    const body = {
      name: nameValue,
      last_name: lastNameValue,
    };

    if (!nameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خالی است");
    }
    if (!lastNameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خانوادگی خالی است");
    }

    setIsLoadingForEdit(true);
    const response = await updateData(CUSTOMER_EDIT_INFORMATION, body, _id);

    if (response.status === 200) {
      await login(response.data.infos, response.data.token);
      setIsLoadingForEdit(false);
      toast.success("اطلاعات با موفقیت ویرایش شد");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForEdit(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForEdit(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default editInfosSubmitHandler;
