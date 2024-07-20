import React from "react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full h-64 bg-gray-200 flex items-center justify-center">
      <Link
        referrerPolicy="origin"
        target="_blank"
        href="https://trustseal.enamad.ir/?id=508337&Code=xxV2ueSAdCBxdpyxUACrkjgxipNUepn9"
      >
        <img
          className="size-44 "
          referrerPolicy="origin"
          //   src="https://trustseal.enamad.ir/logo.aspx?id=508337&Code=xxV2ueSAdCBxdpyxUACrkjgxipNUepn9"
          src="/images/Enemad-logo.png"
          alt=""
          style={{ cursor: "pointer" }}
          data-code="xxV2ueSAdCBxdpyxUACrkjgxipNUepn9"
        />
      </Link>
    </footer>
  );
}
