"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

export type OrderCardType = {
  id: string;
  typeClothing: string;
  serviceType: string;
  count: number;
  cost:number;
  totalCost:number,

};



export type OrderCardContextType = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
};

export const OrderCardContext = createContext<OrderCardContextType | null>(null);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);

  return (
    <OrderCardContext.Provider value={{ orders, setOrders }}>
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
