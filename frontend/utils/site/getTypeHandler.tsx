import { GET_ALL_TYPE } from "@/routeApi/endpoints";
import getData from "@/services/getData";
import { InformationClothingsItemProps } from "@/types/category";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";

const getTypeHandler = async (
  english_name: string,
  setTypeCategory: Dispatch<
    SetStateAction<InformationClothingsItemProps[] | null>
  >,
  setCurrentCategory: Dispatch<SetStateAction<string>>,
  setShowDetails: Dispatch<SetStateAction<boolean[]>>
) => {
  try {
    const response = await getData(
      `${GET_ALL_TYPE}/?clothing_category_English=${english_name}`
    );
    if (response?.status === 200) {
      await setTypeCategory(response.data);
      setCurrentCategory(english_name);
      setShowDetails(new Array(response.data.length).fill(false));
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
  }
};

export default getTypeHandler;
