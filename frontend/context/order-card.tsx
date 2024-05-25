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

export const OrderCard = createContext<OrderCardContextType | null>(null);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);

  return (
    <OrderCard.Provider value={{ orders, setOrders }}>
      {children}
    </OrderCard.Provider>
  );
};

export default OrderCardProvider;
