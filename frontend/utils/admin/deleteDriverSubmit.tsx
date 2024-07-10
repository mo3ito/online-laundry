import deleteData from "@/services/deleteData";
import { DriversType } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ADMIN_DELETE_DRIVER } from "@/routeApi/endpoints";

const deleteDriverSubmit = async (
  driverId: string,
  setIsLoadingForDeleteDriverResponse: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  setAllUnverifiedDrivers: Dispatch<SetStateAction<DriversType[] | []>>,
  setIsShowModalDeleteUnverifyDriver: Dispatch<SetStateAction<boolean>>,
  isUnverified: boolean

) => {
  const body = {
    driver_id: driverId,
  };

  try {
    setIsLoadingForDeleteDriverResponse(true);
    const deleteDriverResponse = await deleteData(
      ADMIN_DELETE_DRIVER,
      body,
      _id
    );
    if (deleteDriverResponse.status === 200) {
        if(isUnverified){
            const allDriverUnverified = await deleteDriverResponse.data.map(
                (item: DriversType) => !item.is_register_by_admin
              );
              setAllUnverifiedDrivers(allDriverUnverified);
              setIsLoadingForDeleteDriverResponse(false);
              setIsShowModalDeleteUnverifyDriver(false);
              toast.success("راننده با موفقیت حذف شد");
        }else{
            const allDriververified = await deleteDriverResponse.data.map(
                (item: DriversType) => item.is_register_by_admin
              );
              setAllUnverifiedDrivers(allDriververified);
              setIsLoadingForDeleteDriverResponse(false);
              setIsShowModalDeleteUnverifyDriver(false);
              toast.success("راننده با موفقیت حذف شد");
        }

    } else {
      setIsLoadingForDeleteDriverResponse(false);
      setIsShowModalDeleteUnverifyDriver(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowModalDeleteUnverifyDriver(false);
      setIsLoadingForDeleteDriverResponse(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowModalDeleteUnverifyDriver(false);
      setIsLoadingForDeleteDriverResponse(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default deleteDriverSubmit;
