"use client";
import React, { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import getData from "@/services/getData";
import { Swiper, SwiperSlide } from "swiper/react";
import { GET_CLOTHING_CATEGORY , GET_ALL_TYPE} from "@/routeApi/endpoints";
import "swiper/css";
import {
  allCategoryType,
  InformationClothingsItemProps,
} from "@/types/category";
import { toast } from "react-toastify";
import Loading from "@/components/Loading/Loading";
import SwiperShowListPrice from "@/components/customerApp/swiper/SwiperShowListPrice";

export default function Page() {
  const [showDetails, setShowDetails] = useState<boolean[]>([]);
  const [typeCategory, setTypeCategory] = useState<
    InformationClothingsItemProps[] | null
  >(null);
  const [currentCategory, setCurrentCategory] = useState<string>("");

  const { data: allGroupTypeData } = useQuery({
    queryKey: ["all group type data"],
    queryFn: () =>
      getData(GET_CLOTHING_CATEGORY),
  });

  const getTypeHandler = async (english_name: string) => {
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

  useEffect(() => {
    if (allGroupTypeData) {
      getTypeHandler("women");
    }
  }, [allGroupTypeData]);

  const toggleDetails = (index: number) => {
    setShowDetails((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };

  return (
    <div className="container mx-auto px-6 py-3">
      <header className="w-full h-20 bg-sky-200 flex items-center justify-center rounded-lg">
        <h1 className="  sm:text-lg md:text-xl  font-bold">لیست قیمت‌ها</h1>
      </header>

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

        <SwiperShowListPrice currentCategory={currentCategory} setCurrentCategory={setCurrentCategory} allGroupTypeData={allGroupTypeData} setTypeCategory={setTypeCategory} setShowDetail={setShowDetails}/>
        {typeCategory?.map(
          (item: InformationClothingsItemProps, index: number) => (
            <div className="w-full h-max mt-5" key={item._id}>
              <div
                onClick={() => toggleDetails(index)}
                className="w-full h-max flex justify-between items-center cursor-pointer bg-sky-200 rounded-lg text-sm sm:text-base"
              >
                <figure className="p-2 rounded-xl flex items-center gap-x-4">
                  <img
                    src={item.image_url || "/images/no-image.jpg"}
                    className="rounded-xl bg-red-200 max-[280px]:size-24 size-28"
                    alt={`عکس ${item.type}`}
                  />
                  <figcaption className="font-bold">{item?.type}</figcaption>
                </figure>
                {showDetails[index] ? (
                  <svg
                    className="size-8 sm:size-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                ) : (
                  <svg
                    className="size-8 sm:size-10"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                )}
              </div>
              <section
                className={`${
                  showDetails[index] ? "block" : "hidden"
                } w-full h-max`}
              >
                <table className="max-[280px]:text-xs text-sm sm:text-base table-auto w-full border-collapse border border-gray-400">
                  <thead>
                    <tr className="bg-gray-200">
                      <th className="border border-gray-300 px-4 py-2">
                        نوع لباس
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        خدمات
                      </th>
                      <th className="border border-gray-300 px-4 py-2">
                        قیمت (تومان)
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    <tr>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.type}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.services.map((service) => (
                          <div key={service._id} className="my-2">
                            <p className="border-b py-2">
                              {service.service_name}
                            </p>
                          </div>
                        ))}
                      </td>
                      <td className="border border-gray-300 px-4 py-2">
                        {item.services.map((service) => (
                          <div key={service._id} className="my-2">
                            <p className="border-b py-2">
                              {Number(service.price).toLocaleString("en-US")}
                            </p>
                          </div>
                        ))}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </section>
            </div>
          )
        )}
      </>
    </div>
  );
}
