"use client";
import InputPassword from "@/components/customerApp/share/inputs/InputPassword";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import ShowHeaderTitle from "@/components/customerSite/ShowHeaderTitle";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { FormEvent, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import sendData from "@/services/sendData";
import { toast } from "react-toastify";

type servicesType = {
  id: string;
  service_name: string;
  price: string;
};

export default function page() {
  const [clothingCategory, setClothingCategory] = useState<string>("");
  const [clothingCategoryEnglish, setClothingCategoryEnglish] =
    useState<string>("");
  const [type, setType] = useState<string>("");
  const [englishType, setEnglishType] = useState<string>("");
  const [services, setServices] = useState<servicesType[] | []>([]);
  const [serviceName, setServiceName] = useState<string>("");
  const [servicePrice, setServicePrice] = useState<string>("");
  const [unit, setUnit] = useState<string>("");
  const [isLoadingForSendClothingType, setIsLoadingForSendClothingType] =
    useState<boolean>(false);
  const { infos } = useAuthContext();
  const router = useRouter();

  const addServiceHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const newService: servicesType = {
      id: uuidv4(),
      service_name: serviceName,
      price: servicePrice,
    };
    setServices((prev) => [...prev, newService]);
  };
  console.log(services);
  const serviceDeleteHandler = (serviceId: string) => {
    const newServicesList = services.filter(
      (service) => service.id !== serviceId
    );
    setServices(newServicesList);
  };

  const addClothingHandlerSubmit = async (event: FormEvent) => {
    event.preventDefault();

    const body = {
      clothing_category: clothingCategory,
      clothing_category_English: clothingCategoryEnglish,
      type,
      english_type: englishType,
      services: services.map((item) => ({
        service_name: item.service_name,
        price: item.price,
      })),
      unit,
    };
    try {
      setIsLoadingForSendClothingType(true);
      const response = await sendData(
        "http://localhost:4000/clothing-type/add-type",
        body,
        "6687ee740956a352601b3a2e"
      );
      if (response.status === 200) {
        setIsLoadingForSendClothingType(false);
        toast.success("نوع لباس با موفقیت اضافه شد");
      } else {
        setIsLoadingForSendClothingType(false);
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);

      if (error.response && error.response.status === 400) {
        setIsLoadingForSendClothingType(false);
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        toast.error(errorMessage);
      } else {
        setIsLoadingForSendClothingType(false);
        console.log("خطا:", error);
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  return (
    <div className="container h-screen mx-auto  flex flex-col items-center mt-44 px-4">
      <ShowHeaderTitle content="افزودن لباس" />
      <div>
        <form
          onSubmit={addClothingHandlerSubmit}
          className="max-[420px]:w-full  w-96 "
        >
          <label
            htmlFor="group"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته‌بندی
          </label>
          <input
            value={clothingCategory}
            onChange={(event) => setClothingCategory(event?.target.value)}
            id="group"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

          <label
            htmlFor="english-group"
            className="my-2 inline-block mr-2 text-sky-500"
          >
            نام دسته بندی انگلیسی
          </label>
          <input
            value={clothingCategoryEnglish}
            onChange={(event) =>
              setClothingCategoryEnglish(event?.target.value)
            }
            id="english-group"
            className="w-full h-10 border block rounded-lg mb-3 outline-none px-2 border-sky-500 text-zinc-500"
            type="text"
          />

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
              placeholder="قیمت خدمت"
            />
            <button
              className="w-full h-10 rounded-lg  bg-sky-500 text-white"
              onClick={addServiceHandler}
            >
              افزودن خدمات
            </button>

            {services.length > 0 && (
              <div className="w-full h-max border block rounded-lg mb-3 outline-none px-2 border-sky-500 bg-sky-100 text-zinc-500 mt-2">
                <ul className="text-sm p-1">
                  {services.map((service) => (
                    <li
                      key={service.id}
                      className="flex justify-between items-center mb-1"
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
  );
}
