"use client";
import React, { useEffect, useState } from "react";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import SwiperShowListPrice from "@/components/customerApp/swiper/SwiperShowListPrice";
import { InformationClothingsItemProps } from "@/types/category";
import getTypeHandler from "@/utils/site/getTypeHandler";
import getData from "@/services/getData";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import { useQuery } from "@tanstack/react-query";
import ShowCategoryGroup from "@/components/customerSite/ShowCategoryGroup";
import ShowCategoryAdmin from "@/components/admin/showCategoryAdmin";
import DefaultButton from "@/components/share/defaultButton";
import deleteData from "@/services/deleteData";
import Modal from "@/components/Modal";
import useAuthContext from "@/hooks/useAuthContext";
import { toast } from "react-toastify";

type typeClothinginfosType = {
  typeClothingId: string;
  typeClothingEnglishName: string;
};

export default function page() {
  const [showDetails, setShowDetails] = useState<boolean[]>([]);
  const [typeCategory, setTypeCategory] = useState<
    InformationClothingsItemProps[] | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [allTypes, setAllTypes] = useState([]);
  const { infos } = useAuthContext();
  const [typeClothinginfos, setTypeClothingInfos] =
    useState<typeClothinginfosType>({
      typeClothingId: "",
      typeClothingEnglishName: "",
    });
  const { data: allGroupTypeData } = useQuery({
    queryKey: ["all group type data"],
    queryFn: () => getData(GET_CLOTHING_CATEGORY),
  });
  const [isShowModalForDeleteType, setIsShowModalForDeleteType] =
    useState<boolean>(false);

  useEffect(() => {
    if (allGroupTypeData) {
      getTypeHandler(
        "women",
        setTypeCategory,
        setCurrentCategory,
        setShowDetails
      );
    }
  }, [allGroupTypeData]);

  console.log("currentCategory", currentCategory);
  console.log("details", showDetails);

  useEffect(() => {
    const getAllTypesCategory = async () => {
      if (currentCategory) {
        const response = await getData(
          `http://localhost:4000/clothing-type/get-all-type/?clothing_category_English=${currentCategory}`
        );
        if (response?.status === 200) {
          setAllTypes(response.data);
        }
      }
    };

    getAllTypesCategory();
  }, [currentCategory]);

  const deleteTypeHandle = async (typeId: string, englishTypeName: string) => {
    setTypeClothingInfos({
      typeClothingId: typeId,
      typeClothingEnglishName: englishTypeName,
    });

    setIsShowModalForDeleteType(true);
  };

  const deleteTypeClothinghandler = async () => {
    const body = {
      type_clothing_id: typeClothinginfos.typeClothingId,
      type_clothing_english_name: typeClothinginfos.typeClothingEnglishName,
    };

    try {
      const deleteTypeResponse = await deleteData(
        "http://localhost:4000/clothing-category/delete-type-clothing",
        body,
        infos?._id
      );

      if (deleteTypeResponse.status === 200) {
        const allTypeResponse = await getData(
          `http://localhost:4000/clothing-type/get-all-type/?clothing_category_English=${currentCategory}`
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

  return (
    <>
      <ShowHeaderTitleFixed content="لباس‌ها" />
      <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-64 pb-20 px-4">
        <SwiperShowListPrice
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          allGroupTypeData={allGroupTypeData}
          setTypeCategory={setTypeCategory}
          setShowDetails={setShowDetails}
        />

        {
          <section className="mt-20 w-full h-max ">
            {allTypes?.map((item: InformationClothingsItemProps) => (
              <div
                key={item._id}
                className="w-full h-max bg-sky-200 rounded-lg p-2 flex justify-between items-center my-2"
              >
                <div className="flex items-center justify-center gap-x-2">
                  <img
                    className="size-16"
                    src={item.image_url || "/images/no-image.jpg"}
                    alt={item.type}
                  />
                  <div className="">
                    <p>{item.type}</p>
                    <p>{item.english_type}</p>
                  </div>
                </div>

                <DefaultButton
                  onClick={() => deleteTypeHandle(item._id, item.english_type)}
                  content="حذف"
                  className="!bg-pink-300 h-10 max-[480px]:w-16 w-44 rounded-lg"
                />
              </div>
            ))}
          </section>
        }
        <Modal
          messageContent="آیا از حذف اطمینان دارید؟"
          isShowModal={isShowModalForDeleteType}
          setIsShowModal={setIsShowModalForDeleteType}
          confirmOnClick={deleteTypeClothinghandler}
        />
      </div>
    </>
  );
}
