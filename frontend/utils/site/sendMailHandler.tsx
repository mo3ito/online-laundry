import { toast } from "react-toastify";
import emailjs from "@emailjs/browser";
import { RefObject, SetStateAction } from "react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

const sendMailHandler = async (
  setIsLoadingForResponse: React.Dispatch<SetStateAction<boolean>>,
  formRef: RefObject<HTMLFormElement | null>,
  router: AppRouterInstance
) => {
  await setIsLoadingForResponse(true);
  try {
    if (formRef?.current) {
      setIsLoadingForResponse(true);
      await emailjs.sendForm(
        "service_264s7x2",
        "template_3h472ui",
        formRef.current,
        {
          publicKey: "S1i02YYSBA6oGu2RM",
        }
      );
     await formRef.current.reset();
      toast.success("پیام شما با موفقیت ارسال شد");
      setIsLoadingForResponse(false);
    } else {
      setIsLoadingForResponse(false);
      toast.error("متاسفانه خطایی رخ داد دوباره امتحان کنید");
    }
  } catch (error) {
    console.log("FAILED...", error);
    setIsLoadingForResponse(false);
    router.push("/");
    toast.error("something wrong");
  }
};

export default sendMailHandler;
