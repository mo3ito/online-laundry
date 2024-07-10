"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React, { useEffect, useState } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DriversType } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import { DRIVER_GET_ALL_DRIVER } from "@/routeApi/endpoints";

export default function page() {
  const { infos } = useAuthContext();
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    DRIVER_GET_ALL_DRIVER,
    ["get all drivers"]
  );
  const [allDriverRegistered, setAllDriverRegistered] = useState<
    DriversType[] | []
  >([]);
  useEffect(() => {
    const filterDriver = async () => {
      if (data) {
        const registeredDrivers = await data.data?.filter(
          (item: DriversType) => item.is_register_by_admin
        );
        setAllDriverRegistered(registeredDrivers);
      }
    };

    filterDriver();
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <ShowHeaderTitleFixed content="رانندگان" />
      {allDriverRegistered?.length > 0 ? (
        <section className="w-full h-max px-4 mt-28 sm:mt-64">
          {allDriverRegistered?.map((item, index) => (
            <table className="table-auto w-full text-center  max-[280px]:text-xs text-sm sm:text-base">
              <thead className="bg-sky-200 rounded-lg ">
                <tr className="">
                  <th className="py-3">شماره</th>
                  <th className="py-3">نام و نام خانوادگی</th>
                  <th className="py-3">شماره موبایل</th>
                  <th className="py-3">تاریخ ثبت‌نام</th>
                </tr>
              </thead>
              <tbody className="bg-sky-300 border border-sky-600">
                <tr>
                  <td key={item._id} className="py-2">
                    {index + 1}
                  </td>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                </tr>
              </tbody>
            </table>
          ))}
        </section>
      ) : (
        <p className="mt-72 text-center">هیچ راننده‌ای وجود ندارد</p>
      )}
    </div>
  );
}
