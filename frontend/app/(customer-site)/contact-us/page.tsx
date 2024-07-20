"use client";
import { useRef, useState } from "react";
import DefaultButton from "@/components/share/defaultButton";
import sendMailHandler from "@/utils/site/sendMailHandler";
import { useRouter } from "next/navigation";
import InputForEmailForm from "@/components/customerSite/InputForEmailForm";
import ShowHeaderTitle from "@/components/customerSite/ShowHeaderTitle";

export default function ContactMeBox() {
  const [isLoadingForResponse, setIsLoadingForResponse] =
    useState<boolean>(false);
  const mailFormRef = useRef<HTMLFormElement | null>(null);
  const router = useRouter();

  return (
    <div className="container mx-auto px-6 mt-20 sm:mt-40">
      <ShowHeaderTitle content="تماس با ما" />
      <form
        ref={mailFormRef}
        className="w-full mt-6 "
        action={() =>
          sendMailHandler(setIsLoadingForResponse, mailFormRef, router)
        }
      >
        <div className="flex flex-col md:flex-row items-center justify-between flex-wrap gap-y-8">
          <InputForEmailForm
            className=" w-full md:w-1/2"
            classNameInput=" w-full md:w-11/12"
            type="text"
            placeholder="نام و نام خانوادگی"
            name="user-full-name"
          />
          <InputForEmailForm
            required={true}
            classNameInput="w-full"
            className=" w-full md:w-1/2"
            type="ایمیل"
            placeholder="ایمیل"
            name="user-email"
          />
          <InputForEmailForm
            className=" w-full "
            classNameInput="w-full"
            type="text"
            placeholder="موضوع"
            name="user-subject"
          />
          <textarea
            name="user-message"
            placeholder="تایپ کنید..."
            className=" resize-none font-bold outline-none focus:border-b-2 focus:border-sky-500 border-b-2 border-zinc-300 w-full text-sm sm:text-base lg:text-base xl:text-lg  bg-transparent h-36 overflow-auto"
          ></textarea>
        </div>
        <DefaultButton
          isLoading={isLoadingForResponse}
          content="ارسال"
          className="w-full my-5 h-12 sm:h-16 text-xl rounded-lg"
          
        >
        </DefaultButton>
      </form>
    </div>
  );
}
