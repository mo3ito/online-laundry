import { toast } from "react-toastify";

const handleCopyToClipboard = async (stateValue: string) => {
  if (navigator.clipboard && stateValue) {
    try {
      await navigator.clipboard.writeText(stateValue);
      toast.success("لینک کپی شد");
    } catch (error) {
      console.error("خطا در کپی لینک: ", error);
    }
  }
};

export default handleCopyToClipboard;
