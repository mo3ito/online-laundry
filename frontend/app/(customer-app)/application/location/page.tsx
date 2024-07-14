"use client";
import React from "react";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import dynamic from "next/dynamic";
import LoadingPage from "@/components/Loading/LoadingPage";
const Neshan = dynamic(() => import("@/components/neshan-map/Neshan"), {
  ssr: false,
  loading: () => <LoadingPage />,
});

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <HeaderComponent title="تعیین آدرس" as="header" />
      <Neshan />
    </div>
  );
}
