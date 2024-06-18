"use client";
import { createContext, useState, useEffect } from "react";
import {
  OrderCardType,
  OrderCardContextType,
  OrderRegisteredType,
} from "@/types/context/OrderCard";
import getData from "@/services/getData";
import useAuthContext from "@/hooks/useAuthContext";
import { toast } from "react-toastify";

export const OrderCardContext = createContext<OrderCardContextType | null>(
  null
);

const OrderCardProvider = ({ children }: { children: React.ReactNode }) => {
  const [orders, setOrders] = useState<OrderCardType[]>([]);
  const [registeredOrders, setRegisteredOrders] = useState<
    OrderRegisteredType[]
  >([]);
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
    if (registeredOrders) {
      const totalRegisterd = registeredOrders.reduce(
        (prev, current) => prev + current.orders.count,
        0
      );
      setTotalNumberRegisterdOrders(totalRegisterd);
    }
  }, [registeredOrders]);



  useEffect(()=>{
    const getRegisteredOrders = async ()=>{

      try {
          if(!!login && infos ){
          const response = await getData("http://localhost:4000/orders/get-orders-customer" , true , undefined , infos._id)
          if(response?.status === 200){
          await setRegisteredOrders(response.data)
          }
        }
      } catch (error: any) {
        console.error("خطا در ارتباط با سرور:", error);
        
        if (error.response && error.response.status === 400) {
          const errorMessage: string =
            error.response.data?.message || "خطایی رخ داده است.";
          toast.error(errorMessage);
        } else {
          console.log("خطا:", error);
          toast.error("متاسفانه خطایی رخ داده است. لطفاً دوباره تلاش کنید.");
        }
      }
    };
     getRegisteredOrders()
  },[login , infos])

  console.log(registeredOrders);
  



  // useEffect(() => {
  //   if (registeredOrders) {
  //     const totalRegisterd = registeredOrders.reduce((prev, current) => {
  //       // Sum the counts of the orders within each registered order
  //       const orderCount = current.orders.reduce((orderPrev, orderCurrent) => orderPrev + orderCurrent.count, 0);
  //       return prev + orderCount;
  //     }, 0);
  //     setTotalNumberRegisterdOrders(totalRegisterd);
  //   }
  // }, [registeredOrders]);

  console.log(totalNumber);

  return (
    <OrderCardContext.Provider
      value={{
        orders,
        setOrders,
        totalNumber,
        setTotalNumber,
        setTotalNumberRegisterdOrders,
        registeredOrders,
        setRegisteredOrders,
        totalNumberRegisterdOrders,
      }}
    >
      {children}
    </OrderCardContext.Provider>
  );
};

export default OrderCardProvider;
