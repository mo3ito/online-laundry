"use client";
import React, { useRef, useEffect, useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import DefaultButton from "@/components/share/defaultButton";
import sendData from "@/services/sendData";
import Logo from "@/components/logo/Logo";
import { VERIFY_CODE } from "@/routeApi/endpoints";
import useAuthContext from "@/hooks/useAuthContext";

export default function Page() {
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);
  const [isActiveSendButton, setIsActiveSendButton] = useState<boolean>(false);
  const [allInputValues, setAllInputValues] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { login } = useAuthContext();
  const router = useRouter();

  useEffect(() => {
    if (inputRefs && inputRefs.current) {
      inputRefs.current[0]?.focus();
    }
  }, []);

  const checkAllInputsFilled = () => {
    const allFilled = inputRefs.current.every(
      (input) => input?.value.length === 1
    );
    setIsActiveSendButton(allFilled);
  };

  const getAllInputsValues = () => {
    const values = inputRefs.current.map((input) => input?.value || "");
    return values.join("");
  };

  useEffect(() => {
    const allValues = getAllInputsValues();
    setAllInputValues(allValues);
  }, [isActiveSendButton]);

  console.log(allInputValues);

  const onChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.target;
    if (input.value.length === 1 && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1]?.focus();
    }
    checkAllInputsFilled();
  };

  const onKeyDownHandler = (
    event: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    const input = event.target as HTMLInputElement;
    if (event.key === "Backspace") {
      if (input.value === "" && index > 0) {
        inputRefs.current[index - 1]?.focus();
      } else {
        input.value = "";
      }
    } else if (event.key < "0" || event.key > "9") {
      event.preventDefault();
    }
    checkAllInputsFilled();
  };

  const sendCodeHandler = async (event: FormEvent) => {
    event.preventDefault();
    try {
      setIsLoading(true);
      const response = await sendData(VERIFY_CODE, {
        code_number: allInputValues,
      });

      if (response.status === 200 && response.data) {
        const { token, infos } = response.data;

        if (token) {
          login(infos, token);
          // router.replace("/application");
          window.location.href = "/application";
        } else {
          router.replace("/application/registration");
        }
      } else {
        console.log(response);
        router.replace("/application/registration");
      }
    } catch (error: any) {
      console.error("خطا در ارتباط با سرور:", error);
      if (error.response?.status === 400) {
        const errorMessage: string =
          error.response.data?.message || "خطایی رخ داده است.";
        toast.error(errorMessage);
      } else {
        toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-screen fixed inset-0 bg-slate-100 z-50 flex items-center justify-center flex-col">
      <form
        onSubmit={sendCodeHandler}
        className="-translate-y-44 text-center  max-[350px]:w-full max-[350px]:px-6 w-8/12 sm:w-96"
      >
        <Logo as="header" />
        <h1 className="my-4 max-[350px]:text-base text-xl sm:text-2xl">
          کد پیامک شده را وارد کنید
        </h1>
        <div
          dir="ltr"
          className="w-full  flex items-center justify-center gap-x-3"
        >
          {Array.from({ length: 5 }).map((_, index) => (
            <input
              maxLength={1}
              key={index}
              ref={(element) => {
                inputRefs.current[index] = element;
              }}
              className="w-1/5 max-[350px]:h-12 h-16 sm:h-20 border border-sky-300 max-[350px]:text-lg text-3xl xl:text-3xl outline-sky-500 rounded-lg text-center"
              type="tel"
              onChange={(event) => onChangeHandler(event, index)}
              onKeyDown={(event) => onKeyDownHandler(event, index)}
              pattern="[0-9]*"
            />
          ))}
        </div>
        <DefaultButton
          content="تایید"
          disabled={!isActiveSendButton}
          isLoading={isLoading}
          className={`${
            isActiveSendButton
              ? "bg-sky-200 border-sky-600 "
              : "bg-zinc-300 border-sky-300"
          } w-full h-12 rounded-lg mt-4 border`}
          classNameContent={`${
            isActiveSendButton ? "text-black" : "text-zinc-500 "
          }`}
        />
      </form>
    </div>
  );
}
