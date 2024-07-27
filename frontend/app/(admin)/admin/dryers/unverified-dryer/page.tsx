"use client";
import ShowHeaderTitleFixed from "@/components/customerSite/ShowheaderTitleFixed";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DryerTypes } from "@/types/admin";
import LoadingPage from "@/components/Loading/LoadingPage";
import { ADMIN_GET_ALL_UNVERIFY_DRYER } from "@/routeApi/endpoints";
import DefaultButton from "@/components/share/defaultButton";
import Modal from "@/components/Modal";
import verifyHandlerDryerSubmit from "@/utils/admin/verifyHandlerDryerSubmit";
import deleteUnveifiedDryer from "@/utils/admin/deleteUnveifiedDryer";

export default function Page() {
  const { infos } = useAuthContext();
  const [isShowModalVerify, setIsShowModalVerify] = useState<boolean>(false);
  const [isShowModalDeleteUnverifyDryer, setIsShowModalDeleteUnverifyDryer] =
    useState<boolean>(false);

  const [dryerId, setDryerId] = useState<string>("");
  const { data, isLoading } = useGetReactQuery(
    infos?._id,
    ADMIN_GET_ALL_UNVERIFY_DRYER,
    ["get all unverified dryers"]
  );
  const [allUnverifiedDryers, setAllUnverifiedDryers] = useState<
    DryerTypes[] | []
  >([]);

  useEffect(() => {
    const allUnverifiedDryers = async () => {
      if (data) {
        setAllUnverifiedDryers(data.data);
      }
    };

    allUnverifiedDryers();
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
      <ShowHeaderTitleFixed content="خشکشویی‌های تایید نشده" />
      {allUnverifiedDryers?.length > 0 ? (
        <section className="w-full h-max px-4 mt-28 md:mt-64 pb-10">
          <table className="table-auto w-full text-center  max-[280px]:text-xs text-sm sm:text-base">
            <thead className="bg-sky-200 rounded-lg ">
              <tr className="">
                <th className="py-3">نام و نام خانوادگی</th>
                <th className="py-3">شماره موبایل</th>
                <th className="py-3">تاریخ ثبت‌نام</th>
                <th className="py-3">عملیات</th>
              </tr>
            </thead>
            {allUnverifiedDryers?.map((item) => (
              <tbody
                className="bg-sky-300 border border-sky-600"
                key={item._id}
              >
                <tr>
                  <td className="py-2">
                    {item.name} {item.last_name}
                  </td>
                  <td className="py-2">{item.phone_number}</td>
                  <td className="py-2">{item.created_at_shamsi}</td>
                  <td className="py-2">
                    <div className="w-full flex items-center justify-center gap-x-3">
                      <DefaultButton
                        onClick={() =>
                          verifyIdHandler(item._id, setIsShowModalVerify)
                        }
                        className="w-1/2 !bg-green-500 h-10 px-2 rounded-lg"
                        content="تایید"
                      />
                      <DefaultButton
                        onClick={() =>
                          verifyIdHandler(
                            item._id,
                            setIsShowModalDeleteUnverifyDryer
                          )
                        }
                        className="w-1/2 !bg-red-400 h-10 px-2 rounded-lg"
                        content="حذف"
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            ))}
          </table>
        </section>
      ) : (
        <p className="mt-72 text-center">
          هیچ خشکشویی تایید نشده‌ای وجود ندارد
        </p>
      )}
      <Modal
        messageContent="آیا از تایید خشکشویی اطمینان دارید؟"
        isShowModal={isShowModalVerify}
        setIsShowModal={setIsShowModalVerify}
        confirmOnClick={() =>
          verifyHandlerDryerSubmit(
            dryerId,
            infos?._id,
            setAllUnverifiedDryers,
            (value) => setIsShowModalVerify(value)
          )
        }
      />
      <Modal
        messageContent="آیا از حذف خشکشویی اطمینان دارید؟"
        isShowModal={isShowModalDeleteUnverifyDryer}
        setIsShowModal={setIsShowModalDeleteUnverifyDryer}
        confirmOnClick={() =>
          deleteUnveifiedDryer(
            dryerId,
            infos?._id,
            setAllUnverifiedDryers,
            (value) => setIsShowModalDeleteUnverifyDryer(value)
          )
        }
      />
    </div>
  );
}
