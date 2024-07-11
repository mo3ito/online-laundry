import deleteData from "@/services/deleteData";
import { DriversType } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ADMIN_DELETE_DRIVER } from "@/routeApi/endpoints";


const deleteDriverSubmit = async (
  driverId: string,
  setIsLoadingForDeleteDriverResponse: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  setArrayDrivers: Dispatch<SetStateAction<DriversType[] | []>>,
  setIsShowModalDeleteUnverifyDriver: Dispatch<SetStateAction<boolean>>,
  isUnverified: boolean,
) => {
  const body = {
    driver_id: driverId,
  };

  try {
    setIsLoadingForDeleteDriverResponse(true);
    const deleteDriverResponse = await deleteData(ADMIN_DELETE_DRIVER, body, _id);

    if (deleteDriverResponse.status === 200) {
      const updatedDrivers = await deleteDriverResponse.data;
      const filteredDrivers = updatedDrivers.filter((item: DriversType) =>
        isUnverified ? !item.is_register_by_admin : item.is_register_by_admin
      );

      setArrayDrivers(filteredDrivers);
      toast.success("راننده با موفقیت حذف شد");
    } else {
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);
    const errorMessage =
      error.response?.data?.message || "متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
    toast.error(errorMessage);
  } finally {
    setIsLoadingForDeleteDriverResponse(false);
    setIsShowModalDeleteUnverifyDriver(false);
  }
};

export default deleteDriverSubmit;
