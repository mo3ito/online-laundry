import { CLOTHING_CATEGORY_ADD_CATEGORY } from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";

const addCategorySubmitHandler = async (
  event: FormEvent,
  clothingCategory: string,
  clothingCategoryEnglish: string,
  setIsLoadingForSendCategory: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined,
  setClothingCategory: Dispatch<SetStateAction<string>>,
  setClothingCategoryEnglish: Dispatch<SetStateAction<string>>
) => {
  event.preventDefault();

  const body = {
    name: clothingCategory,
    english_name: clothingCategoryEnglish,
  };

  try {
    setIsLoadingForSendCategory(true);

    const response = await sendData(CLOTHING_CATEGORY_ADD_CATEGORY, body, _id);
    if (response.status === 200) {
      toast.success("دسته‌بندی با موفقیت اضافه شد");
      setClothingCategory("");
      setClothingCategoryEnglish("");
    } else {
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);
    const errorMessage =
      error.response?.data?.message || "متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.";
    toast.error(errorMessage);
  } finally {
    setIsLoadingForSendCategory(false);
  }
};

export default addCategorySubmitHandler;

