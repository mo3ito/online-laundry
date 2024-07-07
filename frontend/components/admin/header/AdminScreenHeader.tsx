"use client";
import LogoName from "@/components/customerApp/share/LogoName";
import Link from "next/link";
import React, { useState } from "react";
import { adminMnuItems } from "@/data/data";

export default function AdminScreenHeader() {
  const [showMenu, setShowMenu] = useState<boolean[]>(
    new Array(adminMnuItems.length).fill(false)
  );
  console.log(showMenu);

  const showItemHandler = (index: number) => {
    setShowMenu((prevShowMenu) =>
      prevShowMenu.map((item, idx) => (idx === index ? !item : false))
    );
  };

  return (
    <section className="w-full h-max bg-sky-500 fixed top-0 left-0 flex flex-col items-center justify-between">
      <header className="flex justify-between items-center w-full px-8 py-3">
        <div className="flex justify-center items-center gap-x-2">
          <svg
            className="size-8 fill-white"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4 22C4 17.5817 7.58172 14 12 14C16.4183 14 20 17.5817 20 22H18C18 18.6863 15.3137 16 12 16C8.68629 16 6 18.6863 6 22H4ZM12 13C8.685 13 6 10.315 6 7C6 3.685 8.685 1 12 1C15.315 1 18 3.685 18 7C18 10.315 15.315 13 12 13ZM12 11C14.21 11 16 9.21 16 7C16 4.79 14.21 3 12 3C9.79 3 8 4.79 8 7C8 9.21 9.79 11 12 11Z"></path>
          </svg>
          <p className="text-lg text-white">مصطفی انتظامی</p>
        </div>

        <LogoName href="/admin" />
      </header>

      <nav className="w-full h-20 bg-slate-200 flex items-center justify-center">
        <ul className="flex items-center justify-between w-1/5 mr-44">
          <li className="p-4 rounded-full bg-sky-50 cursor-pointer hover:bg-sky-200 hover:border hover:border-sky-500 transition-all duration-150 ease-out relative shadow-lg">
            <Link className="size-full" href="/admin">
              خانه
            </Link>
          </li>
          {adminMnuItems.map((item, index) => (
            <li
              key={index}
              onClick={() => showItemHandler(index)}
              className="p-4 rounded-full bg-sky-50 cursor-pointer hover:bg-sky-200 hover:border hover:border-sky-500 transition-all duration-150 ease-out relative shadow-lg"
            >
              {item.name}
              <nav
                className={`${
                  showMenu[index] ? "absolute" : "hidden"
                } w-44 h-44 bg-sky-50 -bottom-44 inset-x-0 border border-sky-500`}
              >
                <ul className="w-full">
                  <li className="w-full h-10 hover:bg-sky-200 flex items-center px-2 border-b border-sky-200">
                    افزودن نوع لباس
                  </li>
                  <li className="w-full h-10 hover:bg-sky-200 flex items-center px-2 border-b border-sky-200">
                    مشاهده انواع لباس‌ها
                  </li>
                </ul>
              </nav>
            </li>
          ))}
        </ul>
      </nav>
    </section>
  );
}
