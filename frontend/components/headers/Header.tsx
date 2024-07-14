"use client";

import { useRouter } from "next/navigation";
import LogoutButton from "../customerApp/share/buttons/LogoutButton";
import EditInfosButton from "../customerApp/share/buttons/EditInfosButton";
import ShowName from "../customerApp/ShowName";
import IncreaseCredit from "../customerApp/share/buttons/IncreaseCredit";
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
      <header className="bg-sky-500 pb-2 max-[280px]:px-3 px-6  sm:px-8 text-white w-full mx-auto  sm:w-5/6 md:w-5/6 lg:w-4/6 ">
        <div className="flex  justify-between pt-5 ">
          <EditInfosButton hrefPath="/application/edit-information"/>
          <ShowName
            customerName={infos?.name}
            customerLastName={infos?.last_name}
          />
          <LogoutButton onClick={() => setIsShowModalExit(true)} />
        </div>
        {/* <IncreaseCredit /> */}
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
