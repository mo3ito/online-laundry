import updateData from "@/services/updateData";
import { DriversType } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const verifyHandlerDriverSubmit = async (
  driverId: string,
  setIsLoadingForVerifyResponse: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  setAllUnverifiedDrivers: Dispatch<SetStateAction<DriversType[] | []>>,
  setIsShowModalVerify: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    driver_id: driverId,
  };

  try {
    setIsLoadingForVerifyResponse(true);
    const verifyResponse = await updateData(
      "http://localhost:4000/admin/verify-driver",
      body,
      _id
    );

    if (verifyResponse.status === 200) {
      const unVerifiedDriver = await verifyResponse.data.filter(
        (item: DriversType) => !item.is_register_by_admin
      );
      setAllUnverifiedDrivers(unVerifiedDriver);
      setIsShowModalVerify(false);
      setIsLoadingForVerifyResponse(false);
      toast.success("راننده با موفقیت تایید شد");
    } else {
      setIsShowModalVerify(false);
      setIsLoadingForVerifyResponse(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowModalVerify(false);
      setIsLoadingForVerifyResponse(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowModalVerify(false);
      setIsLoadingForVerifyResponse(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default verifyHandlerDriverSubmit;
