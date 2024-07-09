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
      setIsLoadingForSendCategory(false);
      toast.success("دسته‌بندی با موفقیت اضافه شد");
      setClothingCategory("");
      setClothingCategoryEnglish("");
    } else {
      setIsLoadingForSendCategory(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForSendCategory(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForSendCategory(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default addCategorySubmitHandler;
