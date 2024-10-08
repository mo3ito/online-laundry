"use client";
import InformationClothingsItem from "./InformationClothingsItem";
import { useParams } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import getData from "@/services/getData";
import LoadingPage from "@/components/Loading/LoadingPage";
import { InformationClothingsItemProps } from "@/types/category";
import { GET_ALL_TYPE } from "@/routeApi/endpoints";

export default function InformationClothingBox() {
  const params = useParams();
  const groupType = params["group-type"];

  const { data: allGroupTypeData, isLoading } = useQuery({
    queryKey: groupType ? ["all group type data"] : [],
    queryFn: () =>
      getData(`${GET_ALL_TYPE}/?clothing_category_English=${groupType}`),
  });

  console.log(params);
  console.log(allGroupTypeData);

  return (
    <>
      {!isLoading ? (
        <main className=" max-[280px]:px-3 px-6  sm:px-8">
          <section>
            <ul className="w-full pb-28">
              {allGroupTypeData?.data.map(
                (item: InformationClothingsItemProps) => (
                  <InformationClothingsItem {...item} />
                )
              )}
            </ul>
          </section>
        </main>
      ) : (
        <LoadingPage />
      )}
    </>
  );
}
