import updateData from "@/services/updateData";
import { InitialInfosType } from "@/types/context/AuthContextType";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { DELETE_ORDER } from "@/routeApi/endpoints";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const deleteHandler = async (
  orderId: string,
  _id: string | undefined,
  router: AppRouterInstance,
  setIsShowDeleteModal: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    orders_id: orderId,
  };

  try {
    const response = await updateData(DELETE_ORDER, body, _id);
    if (response.status === 200) {
      router.refresh()
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
