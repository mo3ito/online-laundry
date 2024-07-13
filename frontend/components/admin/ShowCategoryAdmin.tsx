import { InformationClothingsItemProps } from "@/types/category";
import React, { Dispatch, SetStateAction } from "react";

type ShowCategoryGroupProps = {
  typeCategory: InformationClothingsItemProps[] | null;
};

export default function ShowCategoryAdmin({
  typeCategory,
}: ShowCategoryGroupProps) {

  return (
<>
  {typeCategory?.map(
    (item: InformationClothingsItemProps, index: number) => (
      <article className="w-full h-max mt-5" key={item._id}>
        <header
          className="w-full h-max flex justify-between items-center cursor-pointer bg-sky-200 rounded-lg text-sm sm:text-base"
        >
          <figure className="p-2 rounded-xl flex items-center gap-x-4">
            <img
              src={item.image_url || "/images/no-photo.png"}
              className="rounded-xl  max-[280px]:size-24 size-28"
              alt={`عکس ${item.type}`}
            />
            <figcaption className="font-bold">{item?.type}</figcaption>
          </figure>

        </header>

      </article>
    )
  )}
</>

  );
}
