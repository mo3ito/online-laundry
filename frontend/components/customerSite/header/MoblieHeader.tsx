import Link from "next/link";
import React from "react";

export default function MoblieHeader() {
  return (
    
    <div className="sm:hidden container flex items-center justify-between w-full bg-sky-200 py-2 px-4 fixed top-0">
      <svg
        className="size-6"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path>
      </svg>
      <div className=" w-max flex items-center justify-between mb-3">
          <div className="flex items-center gap-x-2 ">
            <img
              src="/images/tshirt_2887535.png"
              className=" size-10"
              alt="T-shirt icon"
            />
            <div>
              <h1 className="font-bold text-lg text-sky-600">مسیتو پاک</h1>
              <p className="text-sm">خشکشویی آنلاین</p>
            </div>
          </div>
        </div>
    </div>
  );
}
