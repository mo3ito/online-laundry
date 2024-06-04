'use client'
import { RefObject , useContext } from "react";
import Logo from "@/components/logo/Logo";
import DefaultButton from "@/components/share/defaultButton";
import React, { useRef } from "react";
import useFocusInput from "@/hooks/useFocusInput";
import { AuthContext } from "@/context/authContext";

export default function page() {
    const nameInputRef : RefObject<HTMLInputElement>  = useRef<HTMLInputElement | null>(null);
    // const {infos} = useContext(AuthContext)
    // console.log(infos);
    
    useFocusInput(nameInputRef)
  return (
    <div className="w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center flex-col justify-center">
      <section className="max-[380px]:w-full  max-[410px]:px-3 w-96 h-max -translate-y-44">
        <Logo classNameContainer="bg-transparent " />
        <form className="w-full h-max border border-sky-500  rounded-lg  flex items-center justify-between flex-col max-[380px]:text-sm text-base ">
          <h1 className=" bg-sky-200 w-full rounded-t-lg text-center py-2 font-bold">
            ثبت نام
          </h1>
          <div className="px-3  h-full ">
            <input
            ref={nameInputRef}
              placeholder="نام"
              className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
              type="text"
            />
            <input
              placeholder="نام خانوادگی"
              className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
              type="text"
            />
            <input
              placeholder="نام کاربری"
              className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
              type="text"
            />
            <DefaultButton
              content="تایید"
              className="w-full h-10 rounded-lg my-2"
            />
          </div>
        </form>
      </section>
    </div>
  );
}
