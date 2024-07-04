"use client";
import { Dispatch, SetStateAction, createContext, useState } from "react";

type DriverContext = {
  setTotalOrders: Dispatch<SetStateAction<number>>;
  totalOrders: number;
};

export const DryerContext = createContext<DriverContext | null>(null);

const DryerContexProvider = ({ children }: { children: React.ReactNode }) => {
  const [totalOrders, setTotalOrders] = useState<number>(0);

  return (
    <DryerContext.Provider
      value={{
        setTotalOrders,
        totalOrders,
      }}
    >
      {children}
    </DryerContext.Provider>
  );
};

export default DryerContexProvider;
