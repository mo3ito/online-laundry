import axios, { AxiosError, AxiosResponse } from "axios";

const senderFormData = async (
  path: string,
  id: string | undefined,
  formData: {}
): Promise<AxiosResponse | undefined> => {
  try {
    const response = await axios.post(path, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: id,
      },
    });
    console.log(response);
    return response;
  } catch (error) {
    if (error instanceof AxiosError) {
      console.error("Request failed with status:", error.response?.status);
      console.error("Response data:", error.response?.data);
    }
    throw error;
  }
};

export default senderFormData;
