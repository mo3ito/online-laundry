'use client'
import { Dispatch, SetStateAction, createContext, useState } from "react";

type DriverContext = {
  totalIsNotDoneOrders: number;
  setTotalIsNotDoneOrders: Dispatch<SetStateAction<number>>;
  totalIsDoneOrders: number;
  setTotalIsDoneOrders: Dispatch<SetStateAction<number>>;
};

const initDriverValue = {
  totalIsNotDoneOrders: 0,
  totalIsDoneOrders: 0,
};

export const DriverContext = createContext<DriverContext | null>(null);

const DriverContexProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalIsNotDoneOrders, setTotalIsNotDoneOrders] = useState<number>(0);
  const [totalIsDoneOrders, setTotalIsDoneOrders] = useState<number>(0);

  return (
    <DriverContext.Provider
      value={{
        totalIsNotDoneOrders,
        setTotalIsNotDoneOrders,
        totalIsDoneOrders,
        setTotalIsDoneOrders,
      }}
    >
      {children}
    </DriverContext.Provider>
  );
};

export default DriverContexProvider;
