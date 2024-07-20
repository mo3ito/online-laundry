"use client";
import { createContext, useState, useEffect } from "react";
import {
  OrderCardType,
  OrderCardContextType,
  OrdersRegistered,
} from "@/types/context/OrderCard";
import getData from "@/services/getData";
import useAuthContext from "@/hooks/useAuthContext";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import { GET_ORDERS_CUSTOER } from "@/routeApi/endpoints";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);
  const [registeredOrders, setRegisteredOrders] = useState<
    OrdersRegistered[] | null
  >(null);
  const [totalNumber, setTotalNumber] = useState(0);
  const [totalNumberRegisterdOrders, setTotalNumberRegisterdOrders] =
    useState(0);
  const { infos } = useAuthContext();

  const { data } = useGetReactQuery(
    !infos?.is_driver && !infos?.is_admin && !infos?.is_dryer && infos?._id,
    GET_ORDERS_CUSTOER,
    ["all registered orders"]
  );

  useEffect(() => {
    if (data) {
      setRegisteredOrders(data.data);
    }
  }, [data]);

  useEffect(() => {
    if (orders) {
      const total = orders.reduce((sum, order) => sum + order.count, 0);
      setTotalNumber(total);
    }
  }, [orders]);

  useEffect(() => {
    if (registeredOrders) {
      const totalRegisterd = registeredOrders.reduce(
        (prev, current) => prev + current.count,
        0
      );
      setTotalNumberRegisterdOrders(totalRegisterd);
    }
  }, [registeredOrders]);
  console.log(totalNumberRegisterdOrders);

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
        setRegisteredOrders,
        registeredOrders,
      }}
    >
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
