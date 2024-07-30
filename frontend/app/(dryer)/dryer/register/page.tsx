"use client";
import DefaultButton from "@/components/share/defaultButton";
import React, { FormEvent, useRef, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LogoName from "@/components/customerApp/share/LogoName";
import InputPassword from "@/components/customerApp/share/inputs/InputPassword";
import useFocus from "@/hooks/useFocus";
import Link from "next/link";
import sendData from "@/services/sendData";
import { toast } from "react-toastify";
import { DRYER_REGISTER } from "@/routeApi/endpoints";


export default function page() {
  const { infos, login } = useAuthContext();
  const [nameValue, setNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [laundryName, setLaundryName] = useState<string>("");
  const [laundryAddress, setLaundryAddress] = useState<string>("");
  const [isLoadingForRegister, setIsLoadingForRegister] =
    useState<boolean>(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("");
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  useFocus(inputNameRef);

  console.log(infos);

  const submitDryerHandler = async (event: FormEvent) => {
    event.preventDefault();
    const regex = /^[0-9]*$/;

    if (!nameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خالی است");
    }
    if (!lastNameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خانوادگی خالی است");
    }
    if (!phoneNumberValue.trim()) {
      return toast.warn("مقدار ورودی شماره موبایل خالی است");
    }
    if (!laundryName?.trim()) {
      return toast.warn("مقدار ورودی نام خشکشویی خالی است");
    }
    if (!laundryAddress) {
      return toast.warn("مقدار ورودی آدرس خالی است");
    }
    if (phoneNumberValue.length !== 11) {
      return toast.warn("تعداد کاراکترهای شماره موبایل اشتباه است");
    }
    if (!regex.test(phoneNumberValue)) {
      return toast.warn("لطفا شماره موبایل را با اعداد انگلیسی وارد کنید");
    }
    if (!passwordValue) {
      return toast.warn("مقدار ورودی رمز عبور خالی است");
    }
    if (!repeatPasswordValue) {
      return toast.warn("مقدار ورودی  تکرار رمز عبور خالی است");
    }

    if (passwordValue !== repeatPasswordValue) {
      return toast.warn("رمز عبور با تکرار رمز عبور برابر نیست");
    }
    if (passwordValue.length < 6) {
      return toast.warn(
        "تعداد کاراکترهای رمز عبور باید بیشتر از ۵ کاراکتر باشد"
      );
    }

    const body = {
      name: nameValue,
      last_name: lastNameValue,
      laundry_name: laundryName,
      laundry_address: laundryAddress,
      phone_number: phoneNumberValue,
      password: passwordValue,
    };

    try {
      setIsLoadingForRegister(true);
      const response = await sendData(DRYER_REGISTER, body);
      if (response.status === 200) {
        await login(response.data.infos, response.data.token);
        toast.success("ثبت‌نام با موفقیت انجام شد");
        window.location.href = "/dryer";
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
    } finally {
      setIsLoadingForRegister(false);
    }
  };

  return (
    <div className=" w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center justify-center">
      <section className="flex justify-center items-center flex-col max-[420px]:px-4 px-10 py-12 w-full">
        <LogoName className="!mt-4" />
        <h1 className="w-96 text-center mt-6  text-sky-500 font-bold text-lg">
          ثبت‌نام خشکشویی
        </h1>
        <form
          onSubmit={submitDryerHandler}
          className="max-[420px]:w-full  w-96 overflow-auto max-h-[calc(100vh-100px)] pb-44"
        >
          <label
            htmlFor="name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام
          </label>
          <input
            ref={inputNameRef}
            value={nameValue}
            onChange={(event) => setNameValue(event?.target.value)}
            id="name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500 "
            type="text"
          />
          <label
            htmlFor="last-name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام خانوادگی
          </label>
          <input
            value={lastNameValue}
            onChange={(event) => setLastNameValue(event?.target.value)}
            id="last-name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="laundry-name"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام خشکشویی
          </label>
          <input
            value={laundryName}
            onChange={(event) => setLaundryName(event?.target.value)}
            id="laundry-name"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="phone-number-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            شماره موبایل
          </label>
          <input
            value={phoneNumberValue}
            onChange={(event) => setPhoneNumberValue(event?.target.value)}
            id="phone-number-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="tel"
          />

          <label
            htmlFor="dryer-address"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            آدرس
          </label>

          <textarea
            className="w-full h-20 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500 resize-none overflow-auto"
            value={laundryAddress}
            onChange={(event) => setLaundryAddress(event?.target.value)}
            id="dryer-address"
          ></textarea>
          <InputPassword
            type="password"
            label="رمز عبور"
            id="password-input-id"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event?.target.value)}
          />

          <InputPassword
            type="password"
            label="تکرار رمز عبور"
            id="repeat-password-input-id"
            value={repeatPasswordValue}
            onChange={(event) => setRepeatPasswordValue(event?.target.value)}
          />

          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white"
            isLoading={isLoadingForRegister}
            svgClassName="fill-white"
          />
          <div className="w-full flex justify-center items-center gap-x-2 my-4">
            <p className="max-[280px]:text-sm text-base">
              آیا حساب کاربری دارید؟
            </p>
            <Link
              className="text-sky-500 max-[280px]:text-sm  text-lg font-bold"
              href="/dryer/login"
            >
              ورود
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
