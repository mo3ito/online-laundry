"use client";
import { createContext, useState , useEffect } from "react";
import { OrderCardType, OrderCardContextType } from "@/types/context/orderCard";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);
  const [totalNumber, setTotalNumber] = useState(0);


  useEffect(() => {
    const total = orders.reduce((sum, order) => sum + order.count, 0);
    setTotalNumber(total);
  }, [orders]);


  console.log(totalNumber);
  

  return (
    <OrderCardContext.Provider value={{ orders, setOrders , totalNumber }}>
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
