"use client";
import { OrderCardContext } from "@/context/order-card";
import { useContext } from "react";

const useOrderCardContext = () => {
  const context = useContext(OrderCardContext);
  if (!context) {
    throw new Error("useOrderCardContext must be used within an AuthProvider");
  } else {
    return context;
  }
};

export default useOrderCardContext;
