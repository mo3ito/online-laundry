import React, { useRef, useState } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';


export default function SubgroupShow() {
  return (
    <div className='w-full h-44  bg-red-200 px-8 flex items-center justify-center'>
      <Swiper
        slidesPerView={5}
        spaceBetween={30}
        pagination={{
          clickable: true,
        }}
        modules={[Pagination]}
        className="mySwiper h-40 "
      >
        <SwiperSlide className='size-40 rounded-lg bg-sky-200 p-3'>
            <img className='!size-full' src="/images/washing-machine.jpg" alt="kkjj" />
        </SwiperSlide>

        <SwiperSlide className='size-40 rounded-lg bg-sky-200 p-3'>
            <img className='!size-full' src="/images/washing-machine.jpg" alt="kkjj" />
        </SwiperSlide>

        <SwiperSlide className='size-40 rounded-lg bg-sky-200 p-3'>
            <img className='!size-full' src="/images/washing-machine.jpg" alt="kkjj" />
        </SwiperSlide>

        <SwiperSlide className='size-40 rounded-lg bg-sky-200 p-3'>
            <img className='!size-full' src="/images/washing-machine.jpg" alt="kkjj" />
        </SwiperSlide>
        
        <SwiperSlide className='size-40 rounded-lg bg-sky-200 p-3'>
            <img className='!size-full' src="/images/washing-machine.jpg" alt="kkjj" />
        </SwiperSlide>

      </Swiper>
    </div>
  )
}
