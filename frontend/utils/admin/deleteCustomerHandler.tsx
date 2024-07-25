import { ADMIN_GET_ALL_CUSTOMERS } from "@/routeApi/endpoints";
import deleteData from "@/services/deleteData";
import getData from "@/services/getData";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
import { CustomersType } from "@/types/admin";
import { ADMIN_DELETE_CUSTOMER } from "@/routeApi/endpoints";

const deleteCustomerHandler = async (
  customerId: string,
  _id: string | undefined,
  setAllCustomers: Dispatch<SetStateAction<CustomersType[] | []>>,
  onToggleShowModal: (value: boolean) => unknown
) => {
  const body = {
    customer_id: customerId,
  };

  try {
    const deleteResponse = await deleteData(ADMIN_DELETE_CUSTOMER, body, _id);
    if (deleteResponse.status === 200) {
      const getAllCustomerResponse = await getData(
        ADMIN_GET_ALL_CUSTOMERS,
        true,
        undefined,
        _id
      );
      if (getAllCustomerResponse?.status === 200) {
        await setAllCustomers(getAllCustomerResponse.data);
        toast.success("مشتری با موفقیت حذف شد");
      }
    }
  } catch (error: any) {
    console.error("خطا در ارتباط با سرور:", error);

    if (error.response && error.response.status === 400) {
      const errorMessage: string =
        error.response.data?.message || "خطایی رخ داده است.";
      toast.error(errorMessage);
    } else {
      console.log("خطا:", error);
      toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
    }
  } finally {
    onToggleShowModal(false);
  }
};

export default deleteCustomerHandler;
