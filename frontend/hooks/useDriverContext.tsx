"use client";
import { useContext } from "react";
import { DriverContext } from "@/context/driverContext";

const useDriverContext = () => {
  const context = useContext(DriverContext);

  if (!context) {
    throw new Error("useDriverContext must be used within an AuthProvider");
  }
  return context;
};

export default useDriverContext;
