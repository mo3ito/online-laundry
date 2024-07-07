"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "@/services/getData";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import "swiper/css";
import { InformationClothingsItemProps } from "@/types/category";
import SwiperShowListPrice from "@/components/customerApp/swiper/SwiperShowListPrice";
import ShowCategoryGroup from "@/components/customerSite/ShowCategoryGroup";
import getTypeHandler from "@/utils/site/getTypeHandler";
import ShowHeaderTitle from "@/components/customerSite/ShowHeaderTitle";

export default function Page() {
  const [showDetails, setShowDetails] = useState<boolean[]>([]);
  const [typeCategory, setTypeCategory] = useState<
    InformationClothingsItemProps[] | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const { data: allGroupTypeData } = useQuery({
    queryKey: ["all group type data"],
    queryFn: () => getData(GET_CLOTHING_CATEGORY),
  });

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

  return (
    <div className="container mx-auto px-6 py-3 mt-20 pb-10 sm:mt-0">
      <ShowHeaderTitle content="لیست قیمت‌ها"/>
      <section className="my-5 bg-gray-200 p-3 rounded-lg text-sm sm:text-base">
        <h2 className="font-bold text-lg pb-3">اطلاعیه</h2>
        <p>
          قیمت‌های لباس‌های روشن و سفید، چین دار و غیر معمول، لباس عروس، لباس
          مجلسی و ... به صورت توافقی و بعد از رویت لباس توسط کارشناس تعیین می
          گردد. در صورت وجود لکه، حتما آن را به کارشناسان ما نشان دهید تا لکه
          گیری شود.
        </p>
      </section>
      <>
        <SwiperShowListPrice
          currentCategory={currentCategory}
          setCurrentCategory={setCurrentCategory}
          allGroupTypeData={allGroupTypeData}
          setTypeCategory={setTypeCategory}
          setShowDetails={setShowDetails}
        />
        <ShowCategoryGroup
          typeCategory={typeCategory}
          setShowDetails={setShowDetails}
          showDetails={showDetails}
        />
      </>
    </div>
  );
}
