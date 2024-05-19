import React from "react";

export default function Headline({ title }: { title: string }) {
  return (
    <div className=" container mx-auto px-6 w-full  pb-10">
      <header className="title-header text-2xl text-zinc-700 font-semibold ">
        <h1 className="px-6">{title}</h1>
      </header>
    </div>
  );
}
