import React from "react";

type InputForEmailFromProps = {
  className?: string;
  classNameInput?: string;
  type: string;
  placeholder: string;
  name: string;
  required?: boolean
};

export default function InputForEmailForm({
  className = "w-1/2",
  classNameInput= "w-11/2",
  type = "text",
  placeholder,
  name,
  required= false
}: InputForEmailFromProps) {

  
  return (
    <div className={className}>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        name={name}
        className={`${classNameInput} font-bold outline-none focus:border-b-2 focus:border-sky-500 border-b-2 border-zinc-300  h-16 text-sm sm:text-base lg:text-base xl:text-lg bg-transparent`}
      />
    </div>
  );
}
