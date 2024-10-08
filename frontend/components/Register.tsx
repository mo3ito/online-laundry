"use client";
import DefaultButton from "@/components/share/defaultButton";
import React, { useRef, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import submitRegisterHandler from "@/utils/driver/submitRegisterHandler";
import LogoName from "@/components/customerApp/share/LogoName";
import InputPassword from "@/components/customerApp/share/inputs/InputPassword";
import useFocus from "@/hooks/useFocus";
import Link from "next/link";
import { useRouter } from "next/navigation";

type RegisterProps = {
  apiAddress: string;
  pathRoute: string;
  header: string;
  loginRoute: string;
};

export default function Register({
  apiAddress,
  pathRoute,
  header,
  loginRoute,
}: RegisterProps) {
  const { infos, login } = useAuthContext();
  const [nameValue, setNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [isLoadingForRegister, setIsLoadingForRegister] =
    useState<boolean>(false);
  const [phoneNumberValue, setPhoneNumberValue] = useState<string>("");
  const [passwordValue, setPasswordValue] = useState<string>("");
  const [repeatPasswordValue, setRepeatPasswordValue] = useState<string>("");
  const inputNameRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();
  useFocus(inputNameRef);

  console.log(infos);

  return (
    <div className=" w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center justify-center">
      <section className="flex justify-center items-center flex-col max-[420px]:px-4 px-10 py-12 w-full">
        <LogoName className="!mt-4" />
        <h1 className="w-96 text-center mt-6  text-sky-500 font-bold text-lg">
          {header}
        </h1>
        <form
          onSubmit={(event) =>
            submitRegisterHandler(
              event,
              nameValue,
              lastNameValue,
              phoneNumberValue,
              passwordValue,
              repeatPasswordValue,
              setIsLoadingForRegister,
              login,
              router,
              apiAddress,
              pathRoute
            )
          }
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
              href={loginRoute}
            >
              ورود
            </Link>
          </div>
        </form>
      </section>
    </div>
  );
}
