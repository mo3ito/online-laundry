import updateData from "@/services/updateData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
const deleteHandler = async (
  orderId: string,
  _id: string | undefined,
  login: (infos: InitialInfosType, token: string) => void,
  setIsShowDeleteModal: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    orders_id: orderId,
  };

  try {
    const response = await updateData(
      "http://localhost:4000/orders/delete-order",
      body,
      _id
    );
    if (response.status === 200) {
      await login(response.data.infos, response.data.token);
      toast.success("سفارش با موفقیت حذف شد");
      setIsShowDeleteModal(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowDeleteModal(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowDeleteModal(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default deleteHandler;
