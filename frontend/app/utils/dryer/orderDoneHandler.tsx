import { DONE_ORDER, DRYER_ORDERS } from "@/routeApi/endpoints";
import getData from "@/services/getData";
import updateData from "@/services/updateData";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { OrdersTemplate } from "@/types/context/Orders";

const orderDoneHandler = async (
  _id: string,
  customer_id: string,
  setIsLoadingForApiResponse: Dispatch<SetStateAction<boolean>>,
  dryerId: string | undefined,
  setAllOrders: Dispatch<SetStateAction<OrdersTemplate[] | []>>,
  setIsShowIsDoneModal: Dispatch<SetStateAction<boolean>>
) => {
  const body = {
    customer_id,
    _id,
  };

  try {
    setIsLoadingForApiResponse(true);
    const isDoneResponse = await updateData(DONE_ORDER, body, dryerId);
    if (isDoneResponse.status === 200 && dryerId) {
      const getDataResponse = await getData(
        DRYER_ORDERS,
        true,
        undefined,
        dryerId
      );
      if (getDataResponse?.status === 200) {
        await setAllOrders(getDataResponse.data);
        setIsLoadingForApiResponse(false);
        toast.success("انجام سرویس با موفقیت ثبت شد");
        setIsShowIsDoneModal(false);
      } else {
        setIsLoadingForApiResponse(false);
        setIsShowIsDoneModal(false);
      }
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      setIsShowIsDoneModal(false);
      setIsLoadingForApiResponse(false);
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      setIsShowIsDoneModal(false);
      setIsLoadingForApiResponse(false);
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  }
};

export default orderDoneHandler;
