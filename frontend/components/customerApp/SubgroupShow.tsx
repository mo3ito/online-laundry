import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper/modules";

export default function SubgroupShow() {
  return (
    <div className="w-full h-44  px-8 flex items-center justify-center bg-white">
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        className="mySwiper h-40 "
      >
        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>

        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>

        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>

        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>

        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>

        <SwiperSlide className="size-40 rounded-lg ">
          <div className="size-full flex items-center justify-center flex-col ">
            <figure className="p-2 size-10/12 bg-sky-200 rounded-xl -translate-y-3 cursor-pointer">
              <img
                className="size-full rounded-xl"
                src="/images/washing-machine.jpg"
                alt="Washing Machine"
              />
              <figcaption className="text-center mt-3">زنانه</figcaption>
            </figure>
          </div>
        </SwiperSlide>
      </Swiper>
    </div>
  );
}
