import { Orders } from "@/types/orders";
import { useEffect, useState } from "react";

const useCalculateTotalRegisteredOrders = (allOrders : Orders[]) => {
  const [totalNumberRegistered, setTotalNumberRegisterd] = useState<
    number | undefined
  >(0);
  const [registerdOrders, setRegisteredOrders] = useState<Orders[] | null>(
    null
  );
  useEffect(() => {
    if (allOrders) {
      setRegisteredOrders(allOrders);
    }
  }, [allOrders]);

  useEffect(() => {
    if (allOrders) {
      const total = registerdOrders?.reduce(
        (sum, order) => sum + order.count,
        0
      );
      setTotalNumberRegisterd(total);
    }
  }, [registerdOrders]);

  return { totalNumberRegistered };
};

export default useCalculateTotalRegisteredOrders;
