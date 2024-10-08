"use client";
import { useState, useEffect } from "react";
import SwiperMenu from "../swiper/SwiperMenu";
import HeaderComponent from "./HeaderComponent";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import getData from "@/services/getData";
import LoadingPage from "@/components/Loading/LoadingPage";
import { AllCategoryType } from "@/types/category";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";

export default function SubgroupShowHeader() {
  const [allCategoryWithoutCurrent, setAllCategoryWithoutCurrent] = useState<
    AllCategoryType[] | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<AllCategoryType | null>(null);

  const params = useParams();
  console.log(params);

  const queryKey = ["all category"];

  const { data: allCategory } = useQuery({
    queryKey: queryKey,
    queryFn: () => getData(GET_CLOTHING_CATEGORY),
  });

  useEffect(() => {
    const dataWithoutCurrent = async () => {
      if (allCategory && allCategory.data && params) {
        const dataWithoutCurrentCategory = await allCategory?.data.filter(
          (category: AllCategoryType) =>
            category.english_name !== params["group-type"]
        );
        setAllCategoryWithoutCurrent(dataWithoutCurrentCategory);
      }
    };

    const currentCategory = async () => {
      if (allCategory && allCategory.data && params) {
        const dataWithCurrentCategory = await allCategory?.data.find(
          (category: AllCategoryType) =>
            category.english_name === params["group-type"]
        );
        setCurrentCategory(dataWithCurrentCategory);
      }
    };

    dataWithoutCurrent();
    currentCategory();
  }, [allCategory, params]);

  return (
    <>
      {allCategoryWithoutCurrent && currentCategory ? (
        <header className="sticky top-0 bg-slate-100  z-10">
          <SwiperMenu allCategoryWithoutCurrent={allCategoryWithoutCurrent} />
          <HeaderComponent title={currentCategory?.name} as="div" />
        </header>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
