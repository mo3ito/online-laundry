import { Dispatch, SetStateAction } from "react";

const handleCheckboxChange = (
  orderId: string,
  setOrdersId: Dispatch<SetStateAction<string[]>>
) => {
  setOrdersId((prevOrdersId: string[]) => {
    if (prevOrdersId.includes(orderId)) {
      return prevOrdersId.filter((id) => id !== orderId);
    } else {
      return [...prevOrdersId, orderId];
    }
  });
};

export default handleCheckboxChange;
