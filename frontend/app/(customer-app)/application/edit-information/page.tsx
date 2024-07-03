"use client";
import HeaderComponent from "@/components/customerApp/headerComponent/HeaderComponent";
import DefaultButton from "@/components/share/defaultButton";
import React, { FormEvent, useEffect, useState } from "react";
import useAuthContext from "@/hooks/useAuthContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import NoPersonSvg from "@/components/customerApp/svgs/NoPersonSvg";
import editInfosSubmitHandler from "@/app/utils/editInfosSubmitHandler";
import { toast } from "react-toastify";
import { CUSTOMER_EDIT_INFORMATION } from "@/routeApi/endpoints";

export default function page() {
  const { infos, login } = useAuthContext();
  const [nameValue, setNameValue] = useState<string | undefined>("");
  const [lastNameValue, setLastNameValue] = useState<string | undefined>("");
  const [isLoadingForEdit, setIsLoadingForEdit] = useState<boolean>(false);

  useEffect(() => {
    setNameValue(infos?.name);
    setLastNameValue(infos?.last_name);
  }, [infos]);

  const submitForm = (event: FormEvent) => {
    const body = {
      name: nameValue,
      last_name: lastNameValue,
    };

    if (!nameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خالی است");
    }
    if (!lastNameValue?.trim()) {
      return toast.warn("مقدار ورودی نام خانوادگی خالی است");
    }


    editInfosSubmitHandler(
      event,
      body,
      setIsLoadingForEdit,
      login,
      infos?._id,
      CUSTOMER_EDIT_INFORMATION
    );
  };

  return (
    <div
      style={{ height: `calc(100vh - 248px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <HeaderComponent as="header" title="ویرایش اطلاعات" />
      <section className="flex justify-center items-center flex-col max-[420px]:px-4 px-10 pt-12 w-full">
        <NoPersonSvg />
        <form
          onSubmit={submitForm}
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
          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white"
            isLoading={isLoadingForEdit}
            svgClassName="fill-white"
          />
        </form>
      </section>
    </div>
  );
}
