import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const getData = async (path: string) => {
  try {
    const response: AxiosResponse = await axios.get(path);
    return response;
  } catch (error : unknown) {
    console.error("error: ", error);
    if (error instanceof AxiosError) {
      console.error("Request failed with status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    toast.error("خطای ناگهانی رخ داده است");
    return undefined;
  }
};

export default getData;
