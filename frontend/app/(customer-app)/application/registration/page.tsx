"use client";
import { FormEvent, RefObject, useState } from "react";
import Logo from "@/components/logo/Logo";
import DefaultButton from "@/components/share/defaultButton";
import React, { useRef } from "react";
import useFocusInput from "@/hooks/useFocusInput";
import sendData from "@/services/sendData";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import useAuthContext from "@/hooks/useAuthContext";
import { CUSTOMER_REGISTER } from "@/routeApi/endpoints";

export default function page() {
  const [name, setName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { infos, login } = useAuthContext();
  const nameInputRef: RefObject<HTMLInputElement> =
    useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  const registrationHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body = {
      name,
      last_name: lastName,
      phone_number: phoneNumber,
    };
    try {
      setIsLoading(true);
      const response = await sendData(CUSTOMER_REGISTER, body);
      console.log(response);
      if (response.status === 200) {
        await login(response.data.infos, response.data.token);
        setIsLoading(false);
        window.location.href = "/application";
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);

      if (error.response && error.response.status === 400) {
        setIsLoading(false);
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        toast.error(errorMessage);
      } else {
        setIsLoading(false);
        console.log("خطا:", error);
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  console.log(infos);

  useFocusInput(nameInputRef);
  return (
    <div className="w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center flex-col justify-center">
      <main className="max-[380px]:w-full  max-[410px]:px-3 w-96 h-max -translate-y-44">
        <Logo classNameContainer="bg-transparent " />
        <form
          onSubmit={registrationHandler}
          className="w-full h-max border border-sky-500  rounded-lg  flex items-center justify-between flex-col max-[380px]:text-sm text-base "
        >
          <h1 className=" bg-sky-200 w-full rounded-t-lg text-center py-2 font-bold">
            ثبت نام
          </h1>
          <div className="px-3 w-full h-full ">
            <div className=" w-full h-max">
              <label htmlFor="name" className="sr-only">
                نام
              </label>
              <input
                id="name"
                ref={nameInputRef}
                placeholder="نام"
                className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
                type="text"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="lastName" className="sr-only">
                نام خانوادگی
              </label>
              <input
                id="lastName"
                placeholder="نام خانوادگی"
                className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
                type="text"
                value={lastName}
                onChange={(event) => setLastName(event.target.value)}
              />
            </div>
            <div>
              <label htmlFor="phoneNumber" className="sr-only">
                شماره موبایل
              </label>
              <input
                id="phoneNumber"
                placeholder="شماره موبایل"
                className="h-10 w-full bg-transparent border border-sky-500 rounded-lg outline-sky-600 px-2 my-2"
                type="text"
                value={phoneNumber}
                onChange={(event) => setPhoneNumber(event.target.value)}
              />
            </div>
            <DefaultButton
              isLoading={isLoading}
              content="تایید"
              className="w-full h-10 rounded-lg my-2"
            />
          </div>
        </form>
      </main>
    </div>
  );
}
