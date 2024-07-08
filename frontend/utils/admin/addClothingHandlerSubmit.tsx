import sendData from "@/services/sendData";
import { Dispatch, FormEvent, SetStateAction } from "react";
import { toast } from "react-toastify";
import { ServicesType } from "@/types/admin";

const addClothingHandlerSubmit = async (
  event: FormEvent,
  clothingCategory : string,
  clothingCategoryEnglish: string,
  type : string,
  englishType : string,
  services : ServicesType[],
  unit : string,
  setIsLoadingForSendClothingType: Dispatch<SetStateAction<boolean>>,
  _id: string | undefined
) => {
  event.preventDefault();

  if (
    !clothingCategory.trim() ||
    !clothingCategoryEnglish.trim() ||
    !type.trim() ||
    !englishType.trim() ||
    services.length === 0 ||
    !unit
  ) {
    return toast.warn("لطفا تمامی فیلد‌ها را پر کنید");
  }

  const body = {
    clothing_category: clothingCategory,
    clothing_category_English: clothingCategoryEnglish,
    type,
    english_type: englishType,
    services: services.map((item) => ({
      service_name: item.service_name,
      price: item.price,
    })),
    unit,
  };
  try {
    setIsLoadingForSendClothingType(true);
    const response = await sendData(
      "http://localhost:4000/clothing-type/add-type",
      body,
      _id
    );
    if (response.status === 200) {
      setIsLoadingForSendClothingType(false);
      toast.success("نوع لباس با موفقیت اضافه شد");
    } else {
      setIsLoadingForSendClothingType(false);
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsLoadingForSendClothingType(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsLoadingForSendClothingType(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default addClothingHandlerSubmit;
