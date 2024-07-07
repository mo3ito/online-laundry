import React from "react";

export default function ShowHeaderTitle({ content }: { content: string }) {
  return (
    <header className="w-full h-12 sm:h-16 bg-sky-200 flex items-center justify-center rounded-lg">
      <h1 className="  sm:text-lg md:text-xl  font-bold">{content}</h1>
    </header>
  );
}
