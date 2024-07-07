import Link from "next/link";
import React from "react";

export default function LogoName({ href }: { href: string }) {
  return (
    <Link href={href} className="flex items-center gap-x-2 ">
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
  );
}
