import React from "react";

type StepOneProps = {
  stepNumber: string;
  title: string;
  description: string;
};

export default function StepBox({
  stepNumber,
  title,
  description,
}: StepOneProps) {
  return (
    <section className=" flex items-center justify-center flex-col p-4">
      <header className="bg-sky-500 size-20 sm:size-24 lg:size-28 rounded-full flex items-center justify-center text-white font-bold lg:p-4 text-sm lg:text-base">
        {stepNumber}
      </header>
      <article className="flex items-center justify-center flex-col mt-4">
        <h1 className="font-bold text-sm sm:text-base lg:text-lg my-2">{title}</h1>
        <p className="w-56 break-words text-center text-sm  lg:text-base xl:text-lg ">{description}</p>
      </article>
    </section>
  );
}
