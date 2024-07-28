"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DriversType } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import { ADMIN_GET_ALL_DRYERS } from "@/routeApi/endpoints";
import Modal from "@/components/Modal";
import DefaultButton from "@/components/share/defaultButton";
import submitDeleteVerifyDryers from "@/utils/admin/submitDeleteVerifyDryers";

export default function page() {
  const { infos } = useAuthContext();
  const [isShowModalDeleteDryer, setIsShowModalDeleteDryer] =
    useState<boolean>(false);
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_DRYERS,
    ["get all verified dryers"]
  );
  const [allDryerVerified, setAllDryerVerified] = useState<DriversType[] | []>(
    []
  );
  const [dryerId, setDryerId] = useState<string>("");

  useEffect(() => {
    const filterDriver = async () => {
      if (data) {
        const registeredDrivers = await data.data?.filter(
          (item: DriversType) => item.is_register_by_admin
        );
        setAllDryerVerified(registeredDrivers);
      }
    };

    filterDriver();
  }, [data]);

  const verifyIdHandler = async (
    dryerId: string,
    setState: Dispatch<SetStateAction<boolean>>
  ) => {
    console.log(dryerId);
    setDryerId(dryerId);
    setState(true);
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <div>
      <ShowHeaderTitleFixed content="خشکشویی‌ها" />
      {allDryerVerified?.length > 0 ? (
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
            {allDryerVerified?.map((item, index) => (
              <tbody
                key={item._id}
                className="bg-sky-300 border border-sky-600"
              >
                <tr>
                  <td className="py-2">{index + 1}</td>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                  <td>
                    <DefaultButton
                      onClick={() =>
                        verifyIdHandler(item._id, setIsShowModalDeleteDryer)
                      }
                      className="!bg-red-400 w-full py-1 rounded-lg"
                      content="حذف"
                    />
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </section>
      ) : (
        <p className="mt-72 text-center">هیچ خشکشویی‌ای وجود ندارد</p>
      )}
      <Modal
        messageContent="آیا از حذف خشکشویی اطمینان دارید؟"
        isShowModal={isShowModalDeleteDryer}
        setIsShowModal={setIsShowModalDeleteDryer}
        confirmOnClick={() =>
          submitDeleteVerifyDryers(
            dryerId,
            infos?._id,
            setAllDryerVerified,
            (value) => setIsShowModalDeleteDryer(value)
          )
        }
      />
    </div>
  );
}
