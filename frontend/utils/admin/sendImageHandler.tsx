import senderFormData from "@/services/sendFormData";
import { FormEvent } from "react";
import { toast } from "react-toastify";

const sendImageHandler = async (
  event: FormEvent,
  file: File | null,
  _id: string | undefined
) => {
  event.preventDefault();

  if (!file) {
    return alert("لطفاً یک فایل انتخاب کنید.");
  }

  const formData = new FormData();
  formData.append("clothing-types-image", file);

  try {
    const response = await senderFormData(
      "http://localhost:4000/clothing-type/add-image",
      _id,
      formData
    );
    if (response?.status === 200) {
      toast.success("عکس با موفقیت ارسال شد");
    }
    console.log(response?.data);
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};

export default sendImageHandler;
