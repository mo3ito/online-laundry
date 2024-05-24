"use client";
import SwiperMenu from "../swiper/SwiperMenu";
import HeaderComponent from "./HeaderComponent";

export default function SubgroupShowHeader() {
  return (
    <header className="sticky top-0 bg-slate-100  z-10">
      <SwiperMenu />
      <HeaderComponent title="مردانه" as="div" />
    </header>
  );
}
