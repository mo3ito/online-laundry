"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import DefaultButton from "@/components/share/defaultButton";
import React, { useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import NoPersonSvg from "@/components/customerApp/svgs/NoPersonSvg";
import submitRegisterHandler from "@/app/utils/driver/submitRegisterHandler";

export default function page() {
  const { infos, login } = useAuthContext();
  const [nameValue, setNameValue] = useState<string>("");
  const [lastNameValue, setLastNameValue] = useState<string>("");
  const [isLoadingForRegister, setIsLoadingForRegister] = useState<boolean>(false);
  const [phoneNumberValue , setPhoneNumberValue]=useState<string>("")
  const [passwordValue , setPasswordValue]=useState<string>("")
  const [repeatPasswordValue , setRepeatPasswordValue]=useState<string>("")

console.log(infos);


  return (
    <div
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <HeaderComponent as="header" title="ثبت‌نام راننده" />
      <section className="flex justify-center items-center flex-col max-[420px]:px-4 px-10 pt-12 w-full">
        <NoPersonSvg />
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
            )
          }
          className="max-[420px]:w-full  w-96 "
        >
          <label
            htmlFor="name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام
          </label>
          <input
            value={nameValue}
            onChange={(event) => setNameValue(event?.target.value)}
            id="name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
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
            htmlFor="last-name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            شماره موبایل
          </label>
          <input
            value={phoneNumberValue}
            onChange={(event) => setPhoneNumberValue(event?.target.value)}
            id="last-name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

            <label
            htmlFor="last-name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            رمز
          </label>
          <input
            value={passwordValue}
            onChange={(event) => setPasswordValue(event?.target.value)}
            id="last-name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="password"
          />

            <label
            htmlFor="last-name-user"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            تکرار رمز
          </label>
          <input
            value={repeatPasswordValue}
            onChange={(event) => setRepeatPasswordValue(event?.target.value)}
            id="last-name-user"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="password"
          />

          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white mb-10"
            isLoading={isLoadingForRegister}
          />
        </form>
      </section>
    </div>
  );
}
