"use client";
import { createContext, useState, useEffect } from "react";
import {
  OrderCardType,
  OrderCardContextType,
} from "@/types/context/OrderCard";
import getData from "@/services/getData";
import useAuthContext from "@/hooks/useAuthContext";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);

  const [totalNumber, setTotalNumber] = useState(0);
  const [totalNumberRegisterdOrders, setTotalNumberRegisterdOrders] =useState(0);
  const {infos , login} = useAuthContext()

  useEffect(() => {
    if (orders) {
      const total = orders.reduce((sum, order) => sum + order.count, 0);
      setTotalNumber(total);
    }
  }, [orders]);

  useEffect(() => {
    if (infos && !infos.is_driver) {
      const totalRegisterd = infos?.orders?.reduce(
        (prev, current) => prev + current.count,
        0
      );
      setTotalNumberRegisterdOrders(totalRegisterd);
    }
  }, [infos]);
console.log(infos);


  console.log(totalNumber);

  return (
    <OrderCardContext.Provider
      value={{
        orders,
        setOrders,
        totalNumber,
        setTotalNumber,
        setTotalNumberRegisterdOrders,
        totalNumberRegisterdOrders,
      }}
    >
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
