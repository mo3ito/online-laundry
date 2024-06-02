import axios, { AxiosError, AxiosResponse } from "axios";

const sendData = async (path: string, body: Object): Promise<AxiosResponse> => {
  try {
    const response = await axios.post(path, body, {
      headers: {
        "Content-Type": "application/json",
      },
    });

    return response;
  } catch (error: unknown) {
    if (error instanceof AxiosError) {
      console.error("Request failed with status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    throw error;
  }
};

export default sendData;
