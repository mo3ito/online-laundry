import axios, { AxiosResponse, AxiosError } from "axios";
import { toast } from "react-toastify";

const getData = async (
  path: string,
  isHeader?: boolean,
  ApiKey?: string,
  id?: string
) => {
  try {
    let headers: { [key: string]: string } = {};

    if (isHeader && ApiKey) {
      headers = {
        "Api-Key": ApiKey,
      };
    }
    if (isHeader && id) {
      headers = {
        Authorization: id,
      };
    }

    const response: AxiosResponse = await axios.get(path, { headers });
    return response;
  } catch (error: unknown) {
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
