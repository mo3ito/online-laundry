"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { ADMIN_GET_ALL_VERIFY_DRYERS } from "@/routeApi/endpoints";
import { DryerTypes } from "@/types/admin";
import React, { useEffect, useState } from "react";

export default function payment() {
  const { infos } = useAuthContext();
  const [isShowModalDeleteDryer, setIsShowModalDeleteDryer] =
    useState<boolean>(false);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_VERIFY_DRYERS,
    ["get all verified dryers"]
  );
  const [allDryers, setAllDryers] = useState<DryerTypes[] | []>([]);
  const [dryerId, setDryerId] = useState<string>("");

  useEffect(() => {
    if (data) {
      setAllDryers(data.data);
    }
  }, [data]);
  return (
    <div className="container min-h-screen h-max  mx-auto  flex flex-col items-center  pb-20 px-4 ">
      <ShowHeaderTitleFixed content="تسویه با خشکشویی" />
      <div className=" mt-32 md:mt-64 bg-yellow-200 w-full">
        <select
          className="w-full h-10 rounded-lg mb-3 outline-none px-2 border border-sky-500 text-zinc-500 bg-white"
          name=""
          id=""
        >
          { allDryers.map(item=> <option value={item._id}>{`${item.name} ${item.last_name} (خشکشویی ${item.laundry_name})`}</option>)}
          
        </select>
      </div>
    </div>
  );
}
