"use client";
import MenuItem from "./LaundryMenuItem";
import getData from "@/services/getData";
import { useQuery } from "@tanstack/react-query";
import { GET_CLOTHING_CATEGORY } from "@/routeApi/endpoints";
import LoadingPage from "@/components/Loading/LoadingPage";

type LaundryMenuProps = {
  title: string;
};

type allClothingCategoryType = {
  _id: string;
  image_url: string;
  name: string;
  english_name:string
};

export default function LaundryMenu({ title }: LaundryMenuProps) {
  const queryKey = ["all clothing category"];

  const { data: allClothingCategory, isLoading } = useQuery({
    queryKey: queryKey,
    queryFn: () => getData(GET_CLOTHING_CATEGORY),
  });

  console.log(allClothingCategory);

  return (
    <>
      {!isLoading ? (
        <div className="">
          <h1 className="w-full bg-sky-500 p-3 my-4 text-center text-white">
            {title}
          </h1>
          <ul className="w-full mt-8 px-8 flex items-center justify-center sm:justify-around flex-wrap">
            {allClothingCategory?.data.map((item: allClothingCategoryType) => (
              <MenuItem
                id={item._id && item._id}
                srcImage={item.image_url}
                imageCaption={item.name}
                englishNameCategory={item.english_name}
              />
            ))}
          </ul>
        </div>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
