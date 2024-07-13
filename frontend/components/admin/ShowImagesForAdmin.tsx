"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import React, { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import LoadingPage from "@/components/Loading/LoadingPage";
import { AllDataImagesType } from "@/types/admin";
import deleteImageHandler from "@/utils/admin/deleteImageHandler";

type ShowImagesForAdminProps = {
  deleteImageApi: string;
  getAllImageApi: string;
  headersPage: string;
  emptyMessage: string;
};

export default function ShowImagesForAdmin({
  deleteImageApi,
  getAllImageApi,
  headersPage,
  emptyMessage,
}: ShowImagesForAdminProps) {
  const { infos } = useAuthContext();
  const [allData, setAllData] = useState<AllDataImagesType[] | []>([]);
  const [imageName, setImageName] = useState<string>("");
  const [isShowModalForDeleteImage, setIsShowModalForDeleteImage] =
    useState<boolean>(false);
  const { data, isLoading } = useGetReactQuery(infos?._id, getAllImageApi, [
    "get all data",
  ]);

  useEffect(() => {
    if (data) {
      setAllData(data.data.images);
    }
  }, [data]);

  console.log(allData);

  const handleDeleteImage = async (imageName: string) => {
    await setImageName(imageName);
    setIsShowModalForDeleteImage(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <ShowHeaderTitleFixed content={headersPage} />
      <section className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-32 md:mt-64 pb-20 px-4">
        {!!allData ? (
          <ul className="w-full h-max">
            {allData?.map((item) => (
              <li
                key={item._id}
                className="w-full h-max bg-sky-200 p-2 flex items-center justify-between px-3 rounded-lg mb-2 max-[480px]:text-xs text-sm sm:text-base "
              >
                <figure className="flex flex-col  sm:flex-row sm:items-center gap-x-3 ">
                  <img
                    className="size-20 "
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
                  onClick={() => handleDeleteImage(item.image_name)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center pt-20 max-[280px]:text-sm text-base">
            {emptyMessage}
          </p>
        )}
        <Modal
          messageContent="آیا از حذف اطمینان دارید؟"
          isShowModal={isShowModalForDeleteImage}
          setIsShowModal={setIsShowModalForDeleteImage}
          confirmOnClick={() =>
            deleteImageHandler(
              imageName,
              deleteImageApi,
              getAllImageApi,
              infos?._id,
              setAllData,
              setIsShowModalForDeleteImage
            )
          }
        />
      </section>
    </>
  );
}
