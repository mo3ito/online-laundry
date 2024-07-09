"use client";
import React, { useEffect, useState } from "react";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import SwiperShowListPrice from "@/components/customerApp/swiper/SwiperShowListPrice";
import { InformationClothingsItemProps } from "@/types/category";
import getTypeHandler from "@/utils/site/getTypeHandler";
import getData from "@/services/getData";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import { useQuery } from "@tanstack/react-query";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import useAuthContext from "@/hooks/useAuthContext";
import { TypeClothinginfosType } from "@/types/admin";
import deleteTypeClothingHandler from "@/utils/admin/deleteTypeClothingHandler";
import { GET_ALL_TYPE } from "@/routeApi/endpoints";

export default function page() {
  const [showDetails, setShowDetails] = useState<boolean[]>([]);
  const [typeCategory, setTypeCategory] = useState<
    InformationClothingsItemProps[] | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");
  const [allTypes, setAllTypes] = useState<
    InformationClothingsItemProps[] | []
  >([]);
  const { infos } = useAuthContext();
  const [typeClothinginfos, setTypeClothingInfos] =
    useState<TypeClothinginfosType>({
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
        "men",
        setTypeCategory,
        setCurrentCategory,
        setShowDetails
      );
    }
  }, [allGroupTypeData]);

  useEffect(() => {
    const getAllTypesCategory = async () => {
      if (currentCategory) {
        const response = await getData(
          `${GET_ALL_TYPE}/?clothing_category_English=${currentCategory}`
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

  return (
    <>
      <ShowHeaderTitleFixed content="لباس‌ها" />
      <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-16 sm:mt-56 pb-20 px-4">
        <section className="bg-slate-100 w-full h-48 sticky top-28 sm:top-56 flex items-center justify-center z-40">
          <SwiperShowListPrice
            currentCategory={currentCategory}
            setCurrentCategory={setCurrentCategory}
            allGroupTypeData={allGroupTypeData}
            setTypeCategory={setTypeCategory}
            setShowDetails={setShowDetails}
          />
        </section>

        {
          <section className=" mt-10 sm:mt-2 w-full h-max ">
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
          confirmOnClick={() =>
            deleteTypeClothingHandler(
              typeClothinginfos,
              setAllTypes,
              setIsShowModalForDeleteType,
              infos?._id,
              currentCategory
            )
          }
        />
      </div>
    </>
  );
}
