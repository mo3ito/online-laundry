"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import DefaultButton from "@/components/share/defaultButton";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import { ClothingCategoryType, CategoryInfosType } from "@/types/admin";
import deleteData from "@/services/deleteData";
import { useEffect, useState } from "react";
import Modal from "@/components/Modal";
import getData from "@/services/getData";
import { toast } from "react-toastify";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import categoryDeleteHandler from "@/utils/admin/categoryDeleteHandler";

export default function page() {
  const { infos } = useAuthContext();
  const [isShowDeleteCategoryModal, setIsShowDeleteCategoryModal] =
    useState<boolean>(false);
  const [allcategory, setAllCategory] = useState<ClothingCategoryType[] | []>(
    []
  );
  const [isLoadingForDeleteCategory, setIsLoadingForDeleteCategory] =
    useState<boolean>(false);
  const [categoryInfos, setCategoryInfos] = useState<CategoryInfosType>({
    categoryId: "",
    categoryEnglishName: "",
  });
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    GET_CLOTHING_CATEGORY,
    ["get all category"]
  );

  useEffect(() => {
    if (data) {
      setAllCategory(data.data);
    }
  }, [data]);

  const deleteCategoryHandle = (
    categoryId: string,
    categoryEnglishName: string
  ) => {
    setIsShowDeleteCategoryModal(true);
    setCategoryInfos({
      categoryId,
      categoryEnglishName,
    });
  };

  // const categorydeleteHandler = async () => {
  //   const body = {
  //     clothing_category_id: categoryInfos.categoryId,
  //     clothing_category_english_name: categoryInfos.categoryEnglishName,
  //   };
  //   try {
  //     setIsLoadingForDeleteCategory(true);
  //     const deleteResponse = await deleteData(
  //       "http://localhost:4000/clothing-category/delete-category",
  //       body,
  //       infos?._id
  //     );
  //     if (deleteResponse.status === 200) {
  //       const getCategoryResponse = await getData(
  //         GET_CLOTHING_CATEGORY,
  //         true,
  //         undefined,
  //         infos?._id
  //       );
  //       await setAllCategory(getCategoryResponse?.data);
  //       toast.success("دسته‌بندی با موفقیت حذف شد");
  //       setIsShowDeleteCategoryModal(false);
  //       setIsLoadingForDeleteCategory(false);
  //     } else {
  //       setIsShowDeleteCategoryModal(false);
  //       setIsLoadingForDeleteCategory(false);
  //     }
  //   } catch (error: any) {
  //     console.error("خطا در ارتباط با سرور:", error);

  //     if (error.response && error.response.status === 400) {
  //       setIsLoadingForDeleteCategory(false);
  //       const errorMessage: string =
  //         error.response.data?.message || "خطایی رخ داده است.";
  //         setIsShowDeleteCategoryModal(false)
  //       toast.error(errorMessage);
  //     } else {
  //       setIsShowDeleteCategoryModal(false)
  //       setIsLoadingForDeleteCategory(false);
  //       console.log("خطا:", error);
  //       toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
  //     }
  //   }
  // };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <>
      <ShowHeaderTitleFixed content="دسته‌بندی" />
      <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center mt-44 pb-20 px-4">
        <section className="mt-20 w-full h-max ">
          {allcategory?.map((item: ClothingCategoryType) => (
            <div
              key={item._id}
              className="w-full h-max bg-sky-200 rounded-lg p-2 flex justify-between items-center my-2"
            >
              <div className="flex items-center justify-center gap-x-2">
                <img className="size-16" src={item.image_url} alt={item.name} />
                <div className="">
                  <p>{item.name}</p>
                  <p>{item.english_name}</p>
                </div>
              </div>

              <DefaultButton
                onClick={() =>
                  deleteCategoryHandle(item._id, item.english_name)
                }
                content="حذف"
                className="!bg-pink-300 h-10 max-[480px]:w-16 w-44 rounded-lg"
                isLoading={isLoadingForDeleteCategory}
              />
            </div>
          ))}
        </section>
        <Modal
          messageContent="آیا از حذف اطمینان دارید؟"
          isShowModal={isShowDeleteCategoryModal}
          setIsShowModal={setIsShowDeleteCategoryModal}
          confirmOnClick={() =>
            categoryDeleteHandler(
              categoryInfos,
              setIsLoadingForDeleteCategory,
              infos?._id,
              setAllCategory,
              setIsShowDeleteCategoryModal
            )
          }
        />
      </div>
    </>
  );
}
