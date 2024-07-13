import { InformationClothingsItemProps } from "@/types/category";
import React, { Dispatch, SetStateAction } from "react";

type ShowCategoryGroupProps = {
  typeCategory: InformationClothingsItemProps[] | null;
  setShowDetails: Dispatch<SetStateAction<boolean[]>>;
  showDetails: boolean[];
};

export default function ShowCategoryGroup({
  typeCategory,
  setShowDetails,
  showDetails,
}: ShowCategoryGroupProps) {
  const toggleDetails = (index: number) => {
    setShowDetails((prev) => {
      const newState = [...prev];
      newState[index] = !newState[index];
      return newState;
    });
  };
  return (
<>
  {typeCategory?.map(
    (item: InformationClothingsItemProps, index: number) => (
      <article className="w-full h-max mt-5" key={item._id}>
        <header
          onClick={() => toggleDetails(index)}
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
          {showDetails[index] ? (
            <svg
              className="size-8 sm:size-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
            </svg>
          ) : (
            <svg
              className="size-8 sm:size-10"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
            </svg>
          )}
        </header>
        <section
          className={`${
            showDetails[index] ? "block" : "hidden"
          } w-full h-max`}
        >
          <table className="max-[280px]:text-xs text-sm sm:text-base table-auto w-full border-collapse border border-gray-400">
            <thead>
              <tr className="bg-gray-200">
                <th className="border border-gray-300 px-4 py-2">نوع لباس</th>
                <th className="border border-gray-300 px-4 py-2">خدمات</th>
                <th className="border border-gray-300 px-4 py-2">
                  قیمت (تومان)
                </th>
              </tr>
            </thead>
            <tbody className="text-center">
              <tr>
                <td className="border border-gray-300 px-4 py-2">{item.type}</td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.services.map((service) => (
                    <div key={service._id} className="my-2">
                      <p className="border-b py-2">{service.service_name}</p>
                    </div>
                  ))}
                </td>
                <td className="border border-gray-300 px-4 py-2">
                  {item.services.map((service) => (
                    <div key={service._id} className="my-2">
                      <p className="border-b py-2">
                        {Number(service.price).toLocaleString("en-US")}
                      </p>
                    </div>
                  ))}
                </td>
              </tr>
            </tbody>
          </table>
        </section>
      </article>
    )
  )}
</>

  );
}
