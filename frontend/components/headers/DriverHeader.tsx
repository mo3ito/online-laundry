"use client";
import React, { useEffect, useRef, useState } from "react";
import EditInfosButton from "../customerApp/share/buttons/EditInfosButton";
import Modal from "../Modal";
import { useRouter } from "next/navigation";
import useAuthContext from "@/hooks/useAuthContext";
import LogoutButton from "../customerApp/share/buttons/LogoutButton";
import JobPosition from "../driver/JobPosition";

export default function DriverHeader() {
  const { infos, logout } = useAuthContext();
  const [isShowModalExit, setIsShowModalExit] = useState<boolean>(false);

  const router = useRouter();
  console.log(infos);
  const driverHeaderRef = useRef<HTMLElement | null>(null);
  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <header
        ref={driverHeaderRef}
        className="bg-sky-500 py-2 max-[280px]:px-3 px-6  sm:px-8 text-white w-full mx-auto  sm:w-5/6 md:w-5/6 lg:w-4/6 "
      >
        <div className="flex items-center justify-between  ">
          <EditInfosButton hrefPath="/driver/edit-information" />

          <p className=" text-sm sm:text-lg ">
            {`${infos?.name ? infos.name : ""} ${
              infos?.last_name ? infos.last_name : ""
            }`}
          </p>
          <LogoutButton onClick={() => setIsShowModalExit(true)} />
        </div>
        <JobPosition content="راننده" />
      </header>
      <Modal
        messageContent="آیا از خروج اطمینان دارید؟"
        isShowModal={isShowModalExit}
        setIsShowModal={setIsShowModalExit}
        confirmOnClick={logoutHandler}
      />
    </>
  );
}
