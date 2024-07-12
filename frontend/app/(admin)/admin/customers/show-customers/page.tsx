"use client";
import LoadingPage from "@/components/Loading/LoadingPage";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import React from "react";
import { CustomersType } from "@/types/admin";
import { ADMIN_GET_ALL_CUSTOMERS } from "@/routeApi/endpoints";

export default function Page() {
  const { infos } = useAuthContext();
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_CUSTOMERS,
    ["get all customers"]
  );

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <main className="mt-32 md:mt-64 px-4">
      <ShowHeaderTitleFixed content="مشتریان" />
      {data?.data.length > 0 && (
        <section className="">
          <h1 className="text-sm sm:text-base">
            تعداد کل مشتری‌ها: {data?.data.length} عدد
          </h1>
        </section>
      )}
      {data?.data?.length > 0 ? (
        <section className="w-full h-max  mt-6">
          <table className="table-auto w-full text-center max-[280px]:text-[10px] text-sm sm:text-base">
            <thead className="bg-sky-200 rounded-lg">
              <tr>
                <th className="py-3">شماره</th>
                <th className="py-3">نام و نام خانوادگی</th>
                <th className="py-3">شماره موبایل</th>
                <th className="py-3">تاریخ ثبت‌نام</th>
              </tr>
            </thead>
            <tbody>
              {data?.data?.map((item: CustomersType, index: number) => (
                <tr key={item._id} className="bg-sky-300 border border-sky-600">
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ) : (
        <p className="mt-72 text-center">هیچ مشتری‌ای وجود ندارد</p>
      )}
    </main>
  );
}
