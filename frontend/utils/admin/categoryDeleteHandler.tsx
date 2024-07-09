import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import deleteData from "@/services/deleteData";
import getData from "@/services/getData";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { CategoryInfosType, ClothingCategoryType } from "@/types/admin";
import { CLOTHING_CATEGORY_DELETE_CATEGORY } from "@/routeApi/endpoints";

const categoryDeleteHandler = async (
  categoryInfos: CategoryInfosType,
  setIsLoadingForDeleteCategory: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  setAllCategory: Dispatch<SetStateAction<ClothingCategoryType[] | []>>,
  setIsShowDeleteCategoryModal: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    clothing_category_id: categoryInfos.categoryId,
    clothing_category_english_name: categoryInfos.categoryEnglishName,
  };
  try {
    setIsLoadingForDeleteCategory(true);
    const deleteResponse = await deleteData(
      CLOTHING_CATEGORY_DELETE_CATEGORY,
      body,
      _id
    );
    if (deleteResponse.status === 200) {
      const getCategoryResponse = await getData(
        GET_CLOTHING_CATEGORY,
        true,
        undefined,
        _id
      );
      await setAllCategory(getCategoryResponse?.data);
      toast.success("دسته‌بندی با موفقیت حذف شد");
      setIsShowDeleteCategoryModal(false);
      setIsLoadingForDeleteCategory(false);
    } else {
      setIsShowDeleteCategoryModal(false);
      setIsLoadingForDeleteCategory(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForDeleteCategory(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      setIsShowDeleteCategoryModal(false);
      toast.error(errorMessage);
    } else {
      setIsShowDeleteCategoryModal(false);
      setIsLoadingForDeleteCategory(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default categoryDeleteHandler;
