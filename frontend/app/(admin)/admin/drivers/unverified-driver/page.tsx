"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DriversType } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import { DRIVER_GET_ALL_DRIVER } from "@/routeApi/endpoints";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import { useRouter } from "next/navigation";
import verifyHandlerDriverSubmit from "@/utils/admin/verifyHandlerDriverSubmit";
import deleteDriverSubmit from "@/utils/admin/deleteDriverSubmit";

export default function page() {
  const { infos } = useAuthContext();
  const [isShowModalVerify, setIsShowModalVerify] = useState<boolean>(false);
  const [isShowModalDeleteUnverifyDriver, setIsShowModalDeleteUnverifyDriver] =
    useState<boolean>(false);
  const [isLoadingForVerifyResponse, setIsLoadingForVerifyResponse] =
    useState<boolean>(false);
  const [
    isLoadingForDeleteDriverResponse,
    setIsLoadingForDeleteDriverResponse,
  ] = useState<boolean>(false);
  const [driverId, setDriverId] = useState<string>("");
  const router = useRouter();
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    DRIVER_GET_ALL_DRIVER,
    ["get all drivers"]
  );
  const [allUnverifiedDrivers, setAllUnverifiedDrivers] = useState<
    DriversType[] | []
  >([]);
  useEffect(() => {
    const filterDriver = async () => {
      if (data) {
        const unVerifiedDriver = await data.data?.filter(
          (item: DriversType) => !item.is_register_by_admin
        );
        setAllUnverifiedDrivers(unVerifiedDriver);
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
      <ShowHeaderTitleFixed content="رانندگان تایید نشده" />
      {allUnverifiedDrivers?.length > 0 ? (
        <section className="w-full h-max px-4 mt-28 sm:mt-64">
         
            <table className="table-auto w-full text-center  max-[280px]:text-xs text-sm sm:text-base">
              <thead className="bg-sky-200 rounded-lg ">
                <tr className="">
                  <th className="py-3">نام و نام خانوادگی</th>
                  <th className="py-3">شماره موبایل</th>
                  <th className="py-3">تاریخ ثبت‌نام</th>
                  <th className="py-3">عملیات</th>
                </tr>
              </thead>
              {allUnverifiedDrivers?.map((item, index) => (<tbody className="bg-sky-300 border border-sky-600">
                <tr key={item._id}>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                  <td className="py-2">
                    <div className="w-full flex items-center justify-center gap-x-3">
                      <DefaultButton
                        onClick={() =>
                          verifyDeleteHandler(item._id, setIsShowModalVerify)
                        }
                        className="w-1/2 bg-green-500 h-10 px-2 rounded-lg"
                        content="تایید"
                        isLoading={isLoadingForVerifyResponse}
                      />
                      <DefaultButton
                        onClick={() =>
                          verifyDeleteHandler(
                            item._id,
                            setIsShowModalDeleteUnverifyDriver
                          )
                        }
                        className="w-1/2 bg-red-400 h-10 px-2 rounded-lg"
                        content="حذف"
                        isLoading={isLoadingForDeleteDriverResponse}
                      />
                    </div>
                  </td>
                </tr>
              </tbody>))}
            </table>
          
        </section>
      ) : (
        <p className="mt-72 text-center">
          هیچ راننده‌ی تایید نشده‌ای وجود ندارد
        </p>
      )}
      <Modal
        messageContent="آیا از تایید راننده اطمینان دارید؟"
        isShowModal={isShowModalVerify}
        setIsShowModal={setIsShowModalVerify}
        confirmOnClick={() =>
          verifyHandlerDriverSubmit(
            driverId,
            setIsLoadingForVerifyResponse,
            infos?._id,
            setAllUnverifiedDrivers,
            setIsShowModalVerify
          )
        }
      />
      <Modal
        messageContent="آیا از حذف راننده اطمینان دارید؟"
        isShowModal={isShowModalDeleteUnverifyDriver}
        setIsShowModal={setIsShowModalDeleteUnverifyDriver}
        confirmOnClick={() =>
          deleteDriverSubmit(
            driverId,
            setIsLoadingForDeleteDriverResponse,
            infos?._id,
            setAllUnverifiedDrivers,
            setIsShowModalDeleteUnverifyDriver,
            true
          )
        }
      />
    </div>
  );
}
