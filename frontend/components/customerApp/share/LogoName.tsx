import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

export default function LogoName({
  isLink,
  href,
}: {
  href?: Url | undefined;
  isLink?: boolean;
}) {
  return (
    <>
      {isLink ? (
        <Link href={href as Url} className="flex items-center gap-x-2 ">
          <img
            src="/images/tshirt_2887535.png"
            className=" w-12 h-12"
            alt="T-shirt icon"
          />
          <div>
            <h1 className="font-bold text-xl text-sky-600">مسیتو پاک</h1>
            <p className="text-sm">خشکشویی آنلاین</p>
          </div>
        </Link>
      ) : (
        <div className="flex items-center gap-x-2 ">
          <img
            src="/images/tshirt_2887535.png"
            className=" w-12 h-12"
            alt="T-shirt icon"
          />
          <div>
            <h1 className="font-bold text-xl text-sky-600">مسیتو پاک</h1>
            <p className="text-sm">خشکشویی آنلاین</p>
          </div>
        </div>
      )}
    </>
  );
}
