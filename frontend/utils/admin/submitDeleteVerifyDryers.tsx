import deleteData from "@/services/deleteData";
import { DryerTypes } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ADMIN_DELETE_VERIFY_DRYER } from "@/routeApi/endpoints";

const submitDeleteVerifyDryers = async (
  dryerId: string,
  _id: string | undefined,
  setAllDryerVerified: Dispatch<SetStateAction<DryerTypes[] | []>>,
  onToggleShowDeleteModal: (value: boolean) => unknown
) => {
  const body = {
    dryer_id: dryerId,
  };

  try {
    const deleteDryerResponse = await deleteData(
      ADMIN_DELETE_VERIFY_DRYER,
      body,
      _id
    );
    if (deleteDryerResponse.status === 200) {
      await setAllDryerVerified(deleteDryerResponse.data);
      toast.success("خشکشویی با موفقیت حذف شد");
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

export default submitDeleteVerifyDryers;
