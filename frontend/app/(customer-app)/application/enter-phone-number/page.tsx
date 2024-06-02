"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { VALIDATION_PHONE_NUMBER } from "@/routeApi/endpoints";

export default function Page() {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("09");
  const inputRef = useRef<HTMLInputElement | null>(null);
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(
        phoneNumberInput.length,
        phoneNumberInput.length
      );
    }
  }, []);

  const handleChangePhoneNumber = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newValue = event.target.value;
    if (!newValue.startsWith("09")) {
      setPhoneNumberInput("09");
    } else {
      setPhoneNumberInput(newValue);
    }
  };

  const phoneNumberSubmitHandler = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    console.log(phoneNumberInput);
  };

  return (
    <div className="w-full h-screen inset-0 bg-slate-100 fixed z-50 flex items-center justify-center">
      <div className="mx-6 w-96 h-max border border-sky-500 rounded-lg -translate-y-20 flex flex-col items-center">
        <header className="flex items-center justify-center gap-x-2 bg-sky-200 w-full rounded-t-lg py-2">
          <img
            src="/images/tshirt_2887535.png"
            className="w-12 h-12"
            alt="T-shirt icon"
          />
          <div>
            <h1 className="font-bold text-xl text-sky-600">مسیتو پاک</h1>
            <p className="text-sm">خشکشویی آنلاین</p>
          </div>
        </header>
        <section className="w-full p-2 text-sm sm:text-base">
          <form onSubmit={phoneNumberSubmitHandler} className="w-full">
            <label className="my-2 inline-block" htmlFor="phone-number-input">
              شماره موبایل خود را وارد کنید
            </label>
            <input
              className="w-full h-10 bg-transparent border border-sky-500 outline-none rounded-lg px-2 "
              id="phone-number-input"
              ref={inputRef}
              type="tel"
              value={phoneNumberInput}
              onChange={handleChangePhoneNumber}
            />
            <button className="w-full h-10 bg-sky-200 mt-2 rounded-lg">
              ارسال کد تایید
            </button>
          </form>
        </section>
      </div>
    </div>
  );
}
