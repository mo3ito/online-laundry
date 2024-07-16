"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "../customerApp/share/buttons/LogoutButton";
import EditInfosButton from "../customerApp/share/buttons/EditInfosButton";
import useAuthContext from "@/hooks/useAuthContext";
import Modal from "../Modal";
import { useState } from "react";

export default function Header() {
  const { infos, logout } = useAuthContext();
  const [isShowModalExit, setIsShowModalExit] = useState<boolean>(false);
  const router = useRouter();
  console.log(infos);

  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <>
      <header className="bg-sky-500 py-2 max-[280px]:px-3 px-6  sm:px-8 text-white w-full mx-auto  sm:w-5/6 md:w-5/6 lg:w-4/6 ">
        <div className="flex items-center justify-between">
          <EditInfosButton hrefPath="/application/edit-information" />
          <p className="text-sm sm:text-lg ">{`${
            infos?.name ? infos.name : ""
          } ${infos?.last_name ? infos.last_name : ""}`}</p>
          <LogoutButton onClick={() => setIsShowModalExit(true)} />
        </div>
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
