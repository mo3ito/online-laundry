import React from "react";

export default function ShowHeaderTitleFixed({
  content,
  className,
}: {
  content: string;
  className?: string;
}) {
  return (
    <header
      className={`${className} w-full h-14 sm:h-16 py-2  bg-slate-100 flex items-center justify-center rounded-lg fixed top-14 sm:top-[168px] inset-x-0 z-40 `}
    >
      <div className="container mx-auto px-4 h-full ">
        <h1 className="  sm:text-lg md:text-xl bg-sky-300 rounded-lg font-bold h-full flex items-center justify-center">
          {content}
        </h1>
      </div>
    </header>
  );
}
