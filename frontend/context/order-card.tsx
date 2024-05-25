"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type DefaultOrderCardType = {
  id: string;
  serviceType: string;
  count: number;
};

type OrderCardContextType = {
  order: DefaultOrderCardType[];
  setOrder: Dispatch<SetStateAction<DefaultOrderCardType[]>>;
};

export const OrderCard = createContext<OrderCardContextType | null>(null);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [order, setOrder] = useState<DefaultOrderCardType[]>([]);

  return (
    <OrderCard.Provider value={{ order, setOrder }}>
      {children}
    </OrderCard.Provider>
  );
};

export default OrderCardProvider;
