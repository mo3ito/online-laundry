"use client";
import { createContext, useState, useEffect } from "react";
import { OrderCardType, OrderCardContextType } from "@/types/context/OrderCard";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);
  const [totalNumber, setTotalNumber] = useState(0);
  const [ordersAddress, setOrdersAddress] = useState<{latitude: number, longitude: number , address: string } | null>(null);

  useEffect(() => {
    if (orders) {
      const total = orders.reduce((sum, order) => sum + order.count, 0);
      setTotalNumber(total);
    }
  }, [orders]);

  console.log(totalNumber);

  return (
    <OrderCardContext.Provider
      value={{
        orders,
        setOrders,
        totalNumber,
        ordersAddress,
        setOrdersAddress,
      }}
    >
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
