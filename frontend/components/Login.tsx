"use client";
import LogoName from "@/components/customerApp/share/LogoName";
import InputPassword from "@/components/customerApp/share/inputs/InputPassword";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import submitLoginHandler from "@/utils/driver/submitLoginHandler";

type LoginProps = {
  header: string;
  apiAddress: string;
  pathRoute: string;
  registerRoute: string;
};

export default function Login({
  header,
  apiAddress,
  pathRoute,
  registerRoute,
}: LoginProps) {
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [isLoadingForLogin, setIsLoadingForLogin] = useState<boolean>(false);
  const { login } = useAuthContext();
  const router = useRouter();

  return (
    <div className=" w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center justify-center">
      <section className="flex justify-center items-center flex-col max-[420px]:px-4 px-10 pt-12 w-full -translate-y-36">
        <LogoName  />
        <h1 className="w-96 text-center mt-6  text-sky-500 font-bold text-lg">
          {header}
        </h1>
        <form
          onSubmit={(event) =>
            submitLoginHandler(
              event,
              phoneNumberValue,
              passwordValue,
              login,
              setIsLoadingForLogin,
              router,
              apiAddress,
              pathRoute
            )
          }
          className="max-[420px]:w-full  w-96 "
        >
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
          <InputPassword
            type="password"
            label="رمز عبور"
            id="password-input-id"
            value={passwordValue}
            onChange={(event) => setPasswordValue(event?.target.value)}
          />

          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white"
            svgClassName="fill-white"
            isLoading={isLoadingForLogin}
          />
          <div className="w-full flex justify-center items-center gap-x-2 my-4">
            <p className="max-[280px]:text-sm text-base">
              آیا حساب کاربری ندارید؟
            </p>
            <Link
              className="text-sky-500 max-[280px]:text-sm  text-lg font-bold"
              href={registerRoute}
            >
              ایجاد حساب
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
