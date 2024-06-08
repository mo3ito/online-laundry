"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";
import LoadingPage from "@/components/Loading/LoadingPage";
import Link from "next/link";
import { SwiperMenuPropsType } from "@/types/category";

export default function SwiperMenu({
  allCategoryWithoutCurrent,
}: SwiperMenuPropsType) {
  return (
    <>
      {allCategoryWithoutCurrent ? (
        <div className="w-full h-40  px-8 flex items-center justify-center bg-white ">
          <Swiper
            slidesPerView={1}
            spaceBetween={10}
            breakpoints={{
              300: {
                slidesPerView: 2,
              },
              420: {
                slidesPerView: 3,
              },
              576: {
                slidesPerView: 4,
              },
              768: {
                slidesPerView: 4,
              },
              1024: {
                slidesPerView: 5,
              },
              1280: {
                slidesPerView: 6,
              },
            }}
            pagination={{
              clickable: true,
            }}
            className="mySwiper h-40 "
          >
            {allCategoryWithoutCurrent?.map((category) => (
              <SwiperSlide key={category._id} className=" rounded-lg ">
                <Link href={`/application/group/${category.english_name}`}>
                  <div className="size-full flex items-center justify-center flex-col ">
                    <figure className="p-2 size-28 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
                      <img
                        className="size-full rounded-xl"
                        src={
                          category.image_url
                            ? category.image_url
                            : "/images/no-image.jpg"
                        }
                        alt={`عکس ${category.name}`}
                      />
                      <figcaption className="text-center mt-3">
                        {category.name}
                      </figcaption>
                    </figure>
                  </div>
                </Link>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
