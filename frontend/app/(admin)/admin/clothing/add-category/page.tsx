"use client";
import ShowHeaderTitle from "@/components/customerSite/ShowHeaderTitle";
import DefaultButton from "@/components/share/defaultButton";
import sendImageHandler from "@/utils/admin/sendImageHandler";
import React, { useState } from "react";
import handleFileChange from "@/utils/admin/handleFileChange";
import useAuthContext from "@/hooks/useAuthContext";
import { CLOTHING_CATEGORY_UPLOAD_IMAGE } from "@/routeApi/endpoints";
import addCategorySubmitHandler from "@/utils/admin/addCategorySubmitHandler";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";

export default function page() {
  const [clothingCategory, setClothingCategory] = useState<string>("");
  const [clothingCategoryEnglish, setClothingCategoryEnglish] =
    useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoadingForSendCategory, setIsLoadingForSendCategory] =
    useState<boolean>(false);
  const { infos } = useAuthContext();

  return (
    <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center  pb-20 px-4">
      <ShowHeaderTitleFixed content="افزودن دسته‌بندی" />
      <div className="mt-56">
        <form
          onSubmit={(event) =>
            addCategorySubmitHandler(
              event,
              clothingCategory,
              clothingCategoryEnglish,
              setIsLoadingForSendCategory,
              infos?._id,
              setClothingCategory,
              setClothingCategoryEnglish
            )
          }
          className="max-[420px]:w-full  w-96 mt-10"
        >
          <label
            htmlFor="add-image-clothing"
            className="my-2 inline-block mr-2 text-sky-500 "
          >
            افزودن عکس گروه لباس
          </label>
          <section className="border border-sky-500 rounded-lg p-2">
            <input
              id="add-image-clothing"
              className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
              type="file"
              onChange={(event) => handleFileChange(event, setFile)}
            />
            <button
              className="w-full h-10 rounded-lg  bg-sky-500 text-white"
              onClick={(event) =>
                sendImageHandler(
                  event,
                  file,
                  infos?._id,
                  "clothing-category-image",
                  CLOTHING_CATEGORY_UPLOAD_IMAGE
                )
              }
            >
              ارسال
            </button>
          </section>

          <label
            htmlFor="group-name"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته‌بندی
          </label>
          <input
            value={clothingCategory}
            onChange={(event) => setClothingCategory(event?.target.value)}
            id="group-name"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="english-group-name"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته بندی انگلیسی
          </label>
          <input
            value={clothingCategoryEnglish}
            onChange={(event) =>
              setClothingCategoryEnglish(event?.target.value)
            }
            id="english-group-name"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />
          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white"
            svgClassName="fill-white"
            isLoading={isLoadingForSendCategory}
          />
        </form>
      </div>
    </div>
  );
}
