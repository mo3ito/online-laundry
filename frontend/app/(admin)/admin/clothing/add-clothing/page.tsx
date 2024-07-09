"use client";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import ShowHeaderTitle from "@/components/customerSite/ShowHeaderTitle";
import React, { useEffect, useState } from "react";
import addClothingHandlerSubmit from "@/utils/admin/addClothingHandlerSubmit";
import { ServicesType } from "@/types/admin";
import addServiceHandler from "@/utils/admin/addSrviceHandler";
import sendImageHandler from "@/utils/admin/sendImageHandler";
import handleFileChange from "@/utils/admin/handleFileChange";
import { ADD_IMAGE_TYPE, GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { ClothingCategoryType } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";

export default function page() {
  const [clothingCategory, setClothingCategory] = useState<string>("زنانه");
  const [clothingCategoryEnglish, setClothingCategoryEnglish] =
    useState<string>("women");
  const [type, setType] = useState<string>("");
  const [englishType, setEnglishType] = useState<string>("");
  const [services, setServices] = useState<ServicesType[] | []>([]);
  const [serviceName, setServiceName] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const [isLoadingForSendClothingType, setIsLoadingForSendClothingType] =
    useState<boolean>(false);
  const { infos } = useAuthContext();
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    GET_CLOTHING_CATEGORY,
    ["get all category"]
  );

  const serviceDeleteHandler = (serviceId: string) => {
    const newServicesList = services.filter(
      (service) => service.id !== serviceId
    );
    setServices(newServicesList);
  };

  console.log(clothingCategoryEnglish);

  if(isLoading){
    return <LoadingPage/>
  }

  return (
    <>
    <ShowHeaderTitleFixed content="افزودن لباس" />
    <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center  pb-20 px-4">
      
      <div className="mt-56">
        <form
          onSubmit={(event) =>
            addClothingHandlerSubmit(
              event,
              clothingCategory,
              clothingCategoryEnglish,
              type,
              englishType,
              services,
              unit,
              setIsLoadingForSendClothingType,
              infos?._id
            )
          }
          className="max-[420px]:w-full  w-96 mt-10"
        >
          <label
            htmlFor="add-image-clothing"
            className="my-2 inline-block mr-2 text-sky-500 "
          >
            افزودن عکس لباس
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
                  "clothing-types-image",
                  ADD_IMAGE_TYPE
                )
              }
            >
              ارسال
            </button>
          </section>

          <label
            htmlFor="group"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته‌بندی
          </label>
          <select
            id="group"
            value={clothingCategory}
            onChange={(event) => setClothingCategory(event.target.value)}
            className="w-full h-10 rounded-lg mb-3 outline-none px-2 border border-sky-500 text-zinc-500 bg-white"
          >
            {data?.data.map((item: ClothingCategoryType) => (
              <option key={item._id} value={item.name}>
                {item.name}
              </option>
            ))}
          </select>

          <label
            htmlFor="english-group"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته بندی انگلیسی
          </label>
          <select
            id="english-group"
            value={clothingCategoryEnglish}
            onChange={(event) => setClothingCategoryEnglish(event.target.value)}
            className="w-full h-10 rounded-lg mb-3 outline-none px-2 border border-sky-500 text-zinc-500 bg-white"
          >
            {data?.data.map((item: ClothingCategoryType) => (
              <option key={item._id} value={item.english_name}>
                {item.english_name}
              </option>
            ))}
          </select>

          <label
            htmlFor="clothing-type"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            تایپ لباس
          </label>
          <input
            value={type}
            onChange={(event) => setType(event?.target.value)}
            id="clothing-type"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="english-clothing-type"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            تایپ لباس انگلیسی
          </label>
          <input
            value={englishType}
            onChange={(event) => setEnglishType(event?.target.value)}
            id="english-clothing-type"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="serviceName"
            className="my-2 inline-block mr-2 text-sky-500 "
          >
            خدمات
          </label>
          <section className="border border-sky-500 rounded-lg p-2">
            <input
              value={serviceName}
              onChange={(event) => setServiceName(event?.target.value)}
              id="serviceName"
              className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
              type="text"
              placeholder="نام خدمت"
            />
            <input
              value={servicePrice}
              onChange={(event) => setServicePrice(event?.target.value)}
              id="servicePrice"
              className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
              type="text"
              placeholder="قیمت خدمت(تومان)"
            />
            <button
              className="w-full h-10 rounded-lg  bg-sky-500 text-white"
              onClick={(event) =>
                addServiceHandler(
                  event,
                  servicePrice,
                  serviceName,
                  setServices,
                  setServiceName,
                  setServicePrice
                )
              }
            >
              افزودن خدمت
            </button>

            {services.length > 0 && (
              <div className="w-full h-max border block rounded-lg mb-3 outline-none px-2 border-sky-500 bg-sky-100 text-zinc-500 mt-2">
                <ul className="text-sm p-1">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="flex justify-between items-center my-1"
                    >
                      <div className="flex justify-center items-center gap-x-1">
                        <button
                          onClick={() => serviceDeleteHandler(service.id)}
                          className="size-full"
                        >
                          <svg
                            className="size-5 fill-red-400"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            fill="currentColor"
                          >
                            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
                          </svg>
                        </button>

                        <p>{service.service_name}</p>
                      </div>
                      <p>{service.price}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </section>

          <label htmlFor="unit" className="my-2 inline-block mr-2 text-sky-500">
            واحد شمارش
          </label>
          <input
            value={unit}
            onChange={(event) => setUnit(event?.target.value)}
            id="unit"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <DefaultButton
            content="تایید"
            className="w-full h-12 rounded-lg mt-6 bg-sky-500 text-white"
            svgClassName="fill-white"
            isLoading={isLoadingForSendClothingType}
          />
        </form>
      </div>
    </div>
    </>
  );
}
