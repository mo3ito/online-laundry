"use client";
import React, { useState, useEffect, useRef } from "react";
import LogoName from "@/components/customerApp/share/LogoName";
import { adminMnuItems } from "@/data/data";
import linkHandler from "@/utils/linkHandler";
import { useRouter } from "next/navigation";
import useAuthContext from "@/hooks/useAuthContext";
import Modal from "@/components/Modal";
import useDropDown from "@/hooks/useDropDown";

export default function AdminMobileHeader() {
  const [isSideMenu, setIsSideMenu] = useState<boolean>(false);
  const [isShowAccordion, setIshowAccordion] = useState<boolean[]>(
    new Array(adminMnuItems.length).fill(false)
  );
  const [isShowModalLogout, setIsShowModalLogout] = useState<boolean>(false);
  const router = useRouter();
  const { logout, infos } = useAuthContext();
  const asideRef = useRef<HTMLElement | null>(null);
  useDropDown(asideRef, isSideMenu, setIsSideMenu);

  const showAccordionHandler = (index: number) => {
    setIshowAccordion((prev) =>
      prev.map((item, i) => (i === index ? !item : item))
    );
  };

  const logoutHandler = () => {
    logout();
    setIsSideMenu(false);
    setIsShowModalLogout(false);
    router.push("/");
  };

  return (
    <section className="w-full h-14 bg-sky-500 sm:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4">
      <button
        onClick={() => setIsSideMenu((prev) => !prev)}
        className="size-max "
      >
        <svg
          className="size-7 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </button>

      <LogoName isLink={true} href="/admin" />

      <aside
        ref={asideRef}
        className={`${
          isSideMenu ? "right-0" : "-right-96"
        } max-[320px]:w-56 max-[480px]:w-72 w-96  bg-sky-400 fixed  inset-y-0 py-16 transition-all duration-200 ease-in`}
      >
        <button onClick={() => setIsSideMenu(false)} className="size-max">
          <svg
            className="size-6 absolute left-2 top-3"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>
        </button>

        <section>
          <div className="absolute top-3 right-2 text-sm text-white">
            <div>
              <svg
                className="size-5 inline-block fill-white ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
              </svg>
              <span className="">
                {infos ? `${infos.name} ${infos.last_name}` : ""}
              </span>
            </div>
            <button onClick={() => setIsShowModalLogout(true)} className="mt-2">
              <svg
                className="size-5 inline-block fill-white ml-1"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
              >
                <path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path>
              </svg>
              <span className="">خروج</span>
            </button>
          </div>
        </section>

        <ul className="w-full h-max max-[320px]:text-sm max-[480px]:text-sm ">
          {adminMnuItems.map((item, index) => (
            <li
              key={item.id}
              onClick={() => showAccordionHandler(index)}
              className="w-full h-max  border-y border-zinc-200 "
            >
              <div className="flex items-center justify-between px-4 h-12  max-[480px]:h-10">
                <p className="">{item.name}</p>
                {!isShowAccordion[index] ? (
                  <svg
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path>
                  </svg>
                ) : (
                  <svg
                    className="size-6"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                  >
                    <path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path>
                  </svg>
                )}
              </div>
              <ul className="w-full h-max bg-sky-200 ">
                {item.list?.map(
                  (listItem) =>
                    isShowAccordion[index] && (
                      <li
                        key={listItem.id}
                        onClick={() =>
                          linkHandler(listItem.path, setIsSideMenu, router)
                        }
                        className=" px-6 flex items-center  h-12  max-[480px]:h-10 border-b border-sky-400 cursor-pointer"
                      >
                        {listItem.itemName}
                      </li>
                    )
                )}
              </ul>
            </li>
          ))}
        </ul>
      </aside>
      <Modal
        messageContent="آیا از خروج اطمینان دارید؟"
        isShowModal={isShowModalLogout}
        setIsShowModal={setIsShowModalLogout}
        confirmOnClick={logoutHandler}
      />
    </section>
  );
}
