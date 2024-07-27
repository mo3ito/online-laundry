"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DriversType } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import { ADMIN_GET_ALL_DRIVER } from "@/routeApi/endpoints";
import Modal from "@/components/Modal";
import DefaultButton from "@/components/share/defaultButton";
import deleteDriverSubmit from "@/utils/admin/deleteDriverSubmit";
import { useRouter } from "next/navigation";

export default function page() {
  const { infos } = useAuthContext();
  const [isShowModalDeleteUnverifyDriver, setIsShowModalDeleteUnverifyDriver] =
    useState<boolean>(false);
  const [
    isLoadingForDeleteDriverResponse,
    setIsLoadingForDeleteDriverResponse,
  ] = useState<boolean>(false);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_DRIVER,
    ["get all drivers"]
  );
  const [allDriverRegistered, setAllDriverRegistered] = useState<
    DriversType[] | []
  >([]);
  const [driverId, setDriverId] = useState<string>("");
  const router = useRouter()
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

  const verifyDeleteHandler = async (
    driverId: string,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    await setDriverId(driverId);
    setState(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <ShowHeaderTitleFixed content="خشکشویی‌ها" />
      {allDriverRegistered?.length > 0 ? (
        <section className="w-full h-max px-4 mt-28 md:mt-64 pb-10">
          <table className="table-auto w-full text-center  max-[280px]:text-[10px] text-sm sm:text-base">
            <thead className="bg-sky-200 rounded-lg ">
              <tr className="">
                <th className="py-3">شماره</th>
                <th className="py-3">نام و نام خانوادگی</th>
                <th className="py-3">شماره موبایل</th>
                <th className="py-3">تاریخ ثبت‌نام</th>
                <th className="py-3">عملیات</th>
              </tr>
            </thead>
            {allDriverRegistered?.map((item, index) => (
              <tbody key={item._id} className="bg-sky-300 border border-sky-600">
                <tr >
                  <td className="py-2">
                    {index + 1}
                  </td>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                  <td>
                    <DefaultButton
                      onClick={() =>
                        verifyDeleteHandler(
                          item._id,
                          setIsShowModalDeleteUnverifyDriver
                        )
                      }
                      className="!bg-red-400 w-full py-1 rounded-lg"
                      content="حذف"
                      isLoading={isLoadingForDeleteDriverResponse}
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </section>
      ) : (
        <p className="mt-72 text-center">هیچ راننده‌ای وجود ندارد</p>
      )}
      <Modal
        messageContent="آیا از حذف راننده اطمینان دارید؟"
        isShowModal={isShowModalDeleteUnverifyDriver}
        setIsShowModal={setIsShowModalDeleteUnverifyDriver}
        confirmOnClick={() =>
          deleteDriverSubmit(
            driverId,
            setIsLoadingForDeleteDriverResponse,
            infos?._id,
            setAllDriverRegistered,
            setIsShowModalDeleteUnverifyDriver,
            false

          )
        }
      />
    </div>
  );
}
