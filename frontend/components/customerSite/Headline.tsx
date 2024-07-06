import React from "react";

export default function Headline({ title }: { title: string }) {
  return (
    <div className=" container mx-auto max-[480px]:px-4 px-6 w-full  pb-10">
      <header className="title-header max-[280px]:text-[10px] max-[480px]:text-xs text-sm sm:text-lg xl:text-xl text-zinc-700 font-semibold ">
        <h1 className=" max-[480px]:px-4 px-6">{title}</h1>
      </header>
    </div>
  );
}
