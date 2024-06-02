"use client";
import { useState, useRef, useEffect, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { VALIDATION_PHONE_NUMBER } from "@/routeApi/endpoints";
import sendData from "@/services/sendData";
import DefaultButton from "@/components/share/defaultButton";
import { toast } from "react-toastify";


export default function Page() {
  const [phoneNumberInput, setPhoneNumberInput] = useState<string>("09");
  const [isLoading , setIsLoading] = useState<boolean>(false)
  const router = useRouter()
  
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

  const phoneNumberSubmitHandler = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true)
    const response = await sendData(VALIDATION_PHONE_NUMBER , {phone_number : phoneNumberInput } )

    if(response.status === 200){
        console.log(response);
        setIsLoading(false)
        router.push("/application/validation/verify-code")
    }else{
        setIsLoading(false)
        toast.error("خطایی رخ داد لطفا دوباره تلاش کنید")
    }
  
  
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
            <DefaultButton className="w-full mt-2 h-10 rounded-lg text-sm sm:text-base" content="ارسال کد تایید" isLoading={isLoading} />
          </form>
        </section>
      </div>
    </div>
  );
}
