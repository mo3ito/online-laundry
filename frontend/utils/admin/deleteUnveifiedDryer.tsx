import deleteData from "@/services/deleteData";
import { DryerTypes } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ADMIN_UNVERIFY_DRYER } from "@/routeApi/endpoints";

const deleteUnveifiedDryer = async (
  dryerId: string,
  _id: string | undefined,
  setAllUnverifiedDryers: Dispatch<SetStateAction<DryerTypes[] | []>>,
  onToggleShowDeleteModal: (value: boolean) => unknown
) => {
  const body = {
    dryer_id: dryerId,
  };

  try {
    const deleteUnverifiedDryerResponse = await deleteData(
      ADMIN_UNVERIFY_DRYER,
      body,
      _id
    );
    if (deleteUnverifiedDryerResponse.status === 200) {
      setAllUnverifiedDryers(deleteUnverifiedDryerResponse.data);
      toast.success("حذف خشکشویی با موفقیت انجام شد");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } finally {
    onToggleShowDeleteModal(false);
  }
};

export default deleteUnveifiedDryer;
