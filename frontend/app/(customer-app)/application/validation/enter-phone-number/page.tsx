"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { VALIDATION_PHONE_NUMBER } from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import DefaultButton from "@/components/share/defaultButton";
import { toast } from "react-toastify";
import Logo from "@/components/logo/Logo";

export default function Page() {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("09");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

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

  const phoneNumberSubmitHandler = async (
    event: FormEvent<HTMLFormElement>
  ) => {
    event.preventDefault();
    const regex = /^[0-9]*$/;
    try {
      if (phoneNumberInput.length !== 11) {
        return toast.error("تعداد کاراکترهای شماره موبایل اشتباه است");
      }
      if (!regex.test(phoneNumberInput)) {
        return toast.warn("لطفا شماره موبایل را با اعداد انگلیسی وارد کنید");
      }
      setIsLoading(true);
      const response = await sendData(VALIDATION_PHONE_NUMBER, {
        phone_number: phoneNumberInput,
      });

      if (response.status === 200) {
        console.log(response);
        setIsLoading(false);
        router.replace("/application/validation/verify-code");
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);
      setIsLoading(false);
      if (error.response && error.response.status === 400) {
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        toast.error(errorMessage);
      } else {
        console.log("خطا:", error);
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    }
  };

  return (
    <div className="w-full h-screen inset-0 bg-slate-100 fixed z-50 flex items-center justify-center">
      <div className="mx-6 w-96 h-max border border-sky-500 rounded-lg -translate-y-44 flex flex-col items-center">
        <Logo as="header" />
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
            <DefaultButton
              className="w-full mt-2 h-10 rounded-lg text-sm sm:text-base"
              content="ارسال کد تایید"
              isLoading={isLoading}
            />
          </form>
        </section>
      </div>
    </div>
  );
}
