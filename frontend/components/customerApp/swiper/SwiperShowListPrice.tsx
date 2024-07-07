"use client";
import React, { Dispatch, SetStateAction } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import {
  AllCategoryType,
  InformationClothingsItemProps,
} from "@/types/category";
import Loading from "@/components/Loading/Loading";
import getTypeHandler from "@/utils/site/getTypeHandler";
import { AxiosResponse } from "axios";

type SwiperShowListPriceProps = {
  currentCategory: string;
  setCurrentCategory: Dispatch<SetStateAction<string>>;
  allGroupTypeData: AxiosResponse<any, any> | undefined;
  setTypeCategory: Dispatch<
    SetStateAction<InformationClothingsItemProps[] | null>
  >;
  setShowDetails: Dispatch<SetStateAction<boolean[]>>;
};

export default function SwiperShowListPrice(props: SwiperShowListPriceProps) {
  return (
    <>
      {props.allGroupTypeData ? (
        <section className="w-full h-40 px-8 flex items-center justify-center bg-white rounded-lg">
          <Swiper
            pagination={{ clickable: true }}
            navigation={true}
            slidesPerView={1}
            spaceBetween={5}
            breakpoints={{
              300: { slidesPerView: 2, spaceBetween: 5 },
              420: { slidesPerView: 3, spaceBetween: 10 },
              576: { slidesPerView: 4, spaceBetween: 10 },
              768: { slidesPerView: 4, spaceBetween: 30 },
              1024: { slidesPerView: 5, spaceBetween: 50 },
              1280: { slidesPerView: 7, spaceBetween: 70 },
            }}
            className="mySwiper h-40 w-full"
          >
            {props?.allGroupTypeData?.data?.map((category: AllCategoryType) => (
              <SwiperSlide key={category._id} className="rounded-lg !w-max">
                <button
                  className="w-full h-full"
                  onClick={() =>
                    getTypeHandler(
                      category.english_name,
                      props?.setTypeCategory,
                      props.setCurrentCategory,
                      props.setShowDetails
                    )
                  }
                >
                  <div className="size-full flex items-center justify-center flex-col">
                    <figure
                      className={`${
                        props.currentCategory === category.english_name
                          ? "bg-sky-500"
                          : "bg-sky-200"
                      } p-2 size-28  rounded-xl -translate-y-3 cursor-pointer`}
                    >
                      <img
                        className="size-full rounded-xl"
                        src={category.image_url || "/images/no-image.jpg"}
                        alt={`عکس ${category.name}`}
                      />
                      <figcaption className="text-center mt-3">
                        {category.name}
                      </figcaption>
                    </figure>
                  </div>
                </button>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>
      ) : (
        <Loading className="block mx-auto size-20 " />
      )}
    </>
  );
}
