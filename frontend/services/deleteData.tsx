import axios, { AxiosError, AxiosResponse } from "axios";

const deleteData = async (
  path: string,
  body: Object,
  id?: string
): Promise<AxiosResponse> => {
  try {
    const headers: { [key: string]: string } = {
      "Content-Type": "application/json",
    };

    if (id) {
      headers.Authorization = id;
    }

    const response = await axios.request({
      method: "delete",
      url: path,
      data: body,
      headers: headers,
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

export default deleteData;
