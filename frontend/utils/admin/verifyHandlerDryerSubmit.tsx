import sendData from "@/services/sendData";
import { DryerTypes } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ADMIN_CONFIRM_VERIFY_DRYER } from "@/routeApi/endpoints";

const verifyHandlerDryerSubmit = async (
  dryerId: string,
  _id: string | undefined,
  setAllUnverifiedDryers: Dispatch<SetStateAction<DryerTypes[] | []>>,
  onToggleShowModal: (value: boolean) => unknown
) => {
  const body = {
    dryer_id: dryerId,
  };

  try {
    const verifyDryerByAdminResponse = await sendData(
      ADMIN_CONFIRM_VERIFY_DRYER,
      body,
      _id
    );
    if (verifyDryerByAdminResponse.status === 200) {
      setAllUnverifiedDryers(verifyDryerByAdminResponse.data);
      toast.success("تایید خشکشویی با موفقیت انجام شد");
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
    onToggleShowModal(false);
  }
};

export default verifyHandlerDryerSubmit;
