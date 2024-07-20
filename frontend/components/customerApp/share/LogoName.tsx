import { Url } from "next/dist/shared/lib/router/router";
import Link from "next/link";
import React from "react";

export default function LogoName({
  isLink,
  href,
  className
}: {
  href?: Url | undefined;
  isLink?: boolean;
  className?:string
}) {
  return (
    <>
      {isLink ? (
        <Link  href={href as Url} className={`${className} flex items-center gap-x-2`}>
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
        <div className={`${className} flex items-center gap-x-2`}>
          <img
            src="/images/tshirt_2887535.png"
            className=" size-12 "
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
