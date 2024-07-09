import deleteData from "@/services/deleteData";
import getData from "@/services/getData";
import { toast } from "react-toastify";
import { TypeClothinginfosType } from "@/types/admin";
import { InformationClothingsItemProps } from "@/types/category";
import { Dispatch, SetStateAction } from "react";
import { DELETE_TYPE, GET_ALL_TYPE } from "@/routeApi/endpoints";

const deleteTypeClothingHandler = async (
  typeClothinginfos: TypeClothinginfosType,
  setAllTypes: Dispatch<SetStateAction<InformationClothingsItemProps[] | []>>,
  setIsShowModalForDeleteType: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  currentCategory: string
) => {
  const body = {
    type_clothing_id: typeClothinginfos.typeClothingId,
    type_clothing_english_name: typeClothinginfos.typeClothingEnglishName,
  };

  try {
    const deleteTypeResponse = await deleteData(DELETE_TYPE, body, _id);

    if (deleteTypeResponse.status === 200) {
      const allTypeResponse = await getData(
        `${GET_ALL_TYPE}/?clothing_category_English=${currentCategory}`
      );
      setAllTypes(allTypeResponse?.data);
      setIsShowModalForDeleteType(false);
      toast.success("تایپ لباس با موفقیت حذف شد");
    } else {
      setIsShowModalForDeleteType(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowModalForDeleteType(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowModalForDeleteType(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default deleteTypeClothingHandler;
