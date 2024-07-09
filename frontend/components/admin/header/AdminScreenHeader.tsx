"use client";
import LogoName from "@/components/customerApp/share/LogoName";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";
import { adminMnuItems } from "@/data/data";
import useAuthContext from "@/hooks/useAuthContext";
import { useRouter } from "next/navigation";
import Modal from "@/components/Modal";

export default function AdminScreenHeader() {
  const { infos, logout } = useAuthContext();
  const [showMenu, setShowMenu] = useState<boolean[]>(
    new Array(adminMnuItems.length).fill(false)
  );
  const [isShowLogoutModal, setIsShowLogoutModal] = useState<boolean>(false);
  const menuRefs = useRef<(HTMLLIElement | null)[]>([]);
  const router = useRouter();

  const showItemHandler = (index: number) => {
    setShowMenu((prev) => {
      const newShowMenu = new Array(adminMnuItems.length).fill(false);
      if (!prev[index]) {
        newShowMenu[index] = true;
      }
      return newShowMenu;
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      let isOutside = true;
      menuRefs.current.forEach((ref) => {
        if (ref && ref.contains(event.target as Node)) {
          isOutside = false;
        }
      });

      if (isOutside) {
        setShowMenu(new Array(adminMnuItems.length).fill(false));
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const logoutHandler = () => {
    logout();
    router.push("/");
  };

  return (
    <section className="w-full h-max bg-sky-500 hidden sm:flex fixed top-0 left-0  flex-col items-center justify-between z-50">
      <header className="flex justify-between items-center w-full px-8 py-3">
        <div className=" ">
          <div className="flex justify-center items-center gap-x-2">
            <svg
              className="size-8 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
            </svg>
            <p className="text-xl text-white">{`${infos?.name || ""} ${
              infos?.last_name || ""
            }`}</p>
          </div>
          <button
            onClick={() => setIsShowLogoutModal(true)}
            className="flex justify-center items-center gap-x-2 mt-1 mr-1"
          >
            <svg
              className="size-6 fill-white"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M5 11H13V13H5V16L0 12L5 8V11ZM3.99927 18H6.70835C8.11862 19.2447 9.97111 20 12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C9.97111 4 8.11862 4.75527 6.70835 6H3.99927C5.82368 3.57111 8.72836 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22C8.72836 22 5.82368 20.4289 3.99927 18Z"></path>
            </svg>
            <p className="text-xl text-white">خروج</p>
          </button>
        </div>

        <LogoName isLink={true} href="/admin" />
      </header>

      <nav className="w-full h-20 bg-slate-200 flex items-center justify-center ">
        <ul className="flex items-center justify-center gap-x-5  w-full ">
          <li className="p-4 rounded-full bg-sky-50 cursor-pointer hover:bg-sky-200 hover:border hover:border-sky-500 transition-all duration-150 ease-out relative shadow-lg">
            <Link className="size-full" href="/admin">
              خانه
            </Link>
          </li>
          {adminMnuItems.map((item, index) => (
            <li
              key={index}
              ref={(element) => {
                menuRefs.current[index] = element;
              }}
              onClick={(event) => {
                event.stopPropagation();
                showItemHandler(index);
              }}
              className={`${
                showMenu[index]
                  ? "border border-sky-500 bg-sky-200"
                  : "bg-sky-50  "
              } p-4 rounded-full  cursor-pointer hover:bg-sky-200 hover:border hover:border-sky-500 transition-all duration-150 ease-out relative shadow-lg`}
            >
              {item.name}
              <nav
                className={`${
                  showMenu[index] ? "absolute" : "hidden"
                } w-44 h-max bg-sky-50 top-[57px] inset-x-0 border border-sky-500`}
              >
                <ul className="w-full">
                  {item.list?.map((listItem) => (
                    <li
                      key={listItem.id}
                      className="w-full h-10 hover:bg-sky-200  border-b border-sky-200"
                    >
                      <Link
                        href={listItem.path}
                        className="w-full h-full flex items-center px-2 "
                      >
                        {listItem.itemName}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </li>
          ))}
        </ul>
      </nav>
      <Modal
        messageContent="آیا از خروج اطمینان دارید؟"
        isShowModal={isShowLogoutModal}
        setIsShowModal={setIsShowLogoutModal}
        confirmOnClick={logoutHandler}
      />
    </section>
  );
}
