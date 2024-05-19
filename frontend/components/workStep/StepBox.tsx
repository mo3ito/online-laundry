import React from "react";

type StepOneProps = {
  stepNumber: string;
  title: string;
  description: string;
};

export default function StepOne({
  stepNumber,
  title,
  description,
}: StepOneProps) {
  return (
    <section className=" flex items-center justify-center flex-col p-4">
      <header className="bg-sky-500 size-28 rounded-full flex items-center justify-center text-white font-bold p-4">
        {stepNumber}
      </header>
      <article className="flex items-center justify-center flex-col mt-4">
        <h1 className="font-bold text-lg my-2">{title}</h1>
        <p className="w-56 break-words text-center">{description}</p>
      </article>
    </section>
  );
}
