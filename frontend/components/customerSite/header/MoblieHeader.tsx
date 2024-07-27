"use client";
import { useState, useRef } from "react";
import Link from "next/link";
import React from "react";
import { useRouter } from "next/navigation";
import linkHandler from "@/utils/linkHandler";

export default function MoblieHeader() {
  const [isShowMenu, setIsShowMenu] = useState<boolean>(false);
  const navRef = useRef<HTMLElement | null>(null);
  const router = useRouter();

  return (
    <div className="sm:hidden h-16 container flex items-center justify-between w-full bg-sky-200 py-2 px-4 fixed top-0 z-50">
      <button onClick={() => setIsShowMenu((prev) => !prev)}>
        <svg
          className="size-6"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
        </svg>
      </button>

      <nav
        ref={navRef}
        className={`${
          isShowMenu ? "absolute " : "hidden"
        } w-44 h-max bg-sky-400 top-10 border border-sky-500 `}
      >
        <ul className="w-full  text-white">
          <li
            onClick={() => linkHandler("/", setIsShowMenu, router)}
            className="w-full h-10 hover:bg-sky-500 flex items-center px-2  border-b cursor-pointer"
          >
            خانه
          </li>
          <li
            onClick={() =>
              linkHandler("https://mo3ito-pak.ir", setIsShowMenu, router)
            }
            className="w-full h-10 hover:bg-sky-500 flex items-center px-2  border-b cursor-pointer"
          >
            دریافت اپلیکیشن
          </li>
          <li
            onClick={() => linkHandler("/application", setIsShowMenu, router)}
            className="w-full h-10 hover:bg-sky-500 flex items-center px-2  border-b cursor-pointer"
          >
            ثبت سفارش
          </li>

          <li
            onClick={() => linkHandler("/price-list", setIsShowMenu, router)}
            className="w-full h-10 hover:bg-sky-500 flex items-center px-2  border-b cursor-pointer"
          >
            لیست قیمت‌ها
          </li>
          <li
            onClick={() => linkHandler("/contact-us", setIsShowMenu, router)}
            className="w-full h-10 hover:bg-sky-500 flex items-center px-2 border-b cursor-pointer"
          >
            تماس با ما
          </li>
        </ul>
      </nav>

      <Link href="/" className=" w-max flex items-center justify-between mb-3">
        <div className="flex items-center gap-x-2 ">
          <img
            src="/images/tshirt_2887535.png"
            className=" size-10"
            alt="T-shirt icon"
          />
          <div>
            <h1 className="font-bold text-base sm:text-lg text-sky-600">
              مسیتو پاک
            </h1>
            <p className=" text-xs sm:text-sm">خشکشویی آنلاین</p>
          </div>
        </div>
      </Link>
    </div>
  );
}
