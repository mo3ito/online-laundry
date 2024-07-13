"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import React, { useEffect, useState } from "react";

type allDataImagesType = {
  _id: string;
  image_name: string;
  image_url: string;
};

export default function page() {
  const { infos } = useAuthContext();
  const [allData, setAllData] = useState<allDataImagesType[] | []>([]);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    "http://localhost:4000/admin/get-all-category-images",
    ["get all data"]
  );

  useEffect(() => {
    if (data) {
      setAllData(data.data.images);
    }
  }, [data]);

  console.log(allData);

  return (
    <>
      <ShowHeaderTitleFixed content="عکس‌های دسته‌بندی" />
      <section className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-32 md:mt-64 pb-20 px-4">
        <ul className="w-full h-max">
          {allData?.map((item) => (
            <li
              key={item._id}
              className="w-full h-max bg-sky-200 p-2 flex items-center justify-between px-3 rounded-lg mb-2 max-[480px]:text-xs text-sm sm:text-base "
            >
              <figure className="flex flex-col  sm:flex-row items-center gap-x-3 ">
                <img
                  className="size-20 bg-red-200"
                  src={item.image_url}
                  alt={item.image_name}
                />
                <figcaption className=" mt-2 sm:mt-0 ">
                  {item.image_name}
                </figcaption>
              </figure>
              <DefaultButton
                content="حذف"
                className="w-20 sm:w-28  !bg-red-300 py-2 rounded-lg"
              />
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}
