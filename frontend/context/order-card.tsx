"use client";
import { createContext, useState } from "react";
import { OrderCardType, OrderCardContextType } from "@/types/context/orderCard";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);

  return (
    <OrderCardContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
