import deleteData from "@/services/deleteData";
import getData from "@/services/getData";
import { AllDataImagesType } from "@/types/admin";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const deleteImageHandler = async (
  imageName: string,
  deleteApiAddress: string,
  getApiAddress: string,
  _id: string | undefined,
  setAllData: Dispatch<SetStateAction<AllDataImagesType[] | []>>,
  setIsShowModalForDeleteImage: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    image_name: imageName,
  };

  try {
    const deleteResponse = await deleteData(deleteApiAddress, body, _id);
    if (deleteResponse.status === 200) {
      const getImagesResponse = await getData(
        getApiAddress,
        true,
        undefined,
        _id
      );
      if (getImagesResponse?.status === 200) {
        await setAllData(getImagesResponse?.data.images);
        toast.success("عکس با موفقیت حذف شد");
      }
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
    setIsShowModalForDeleteImage(false);
  }
};

export default deleteImageHandler;
