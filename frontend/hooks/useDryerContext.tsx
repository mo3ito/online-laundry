"use client";
import { useContext } from "react";
import { DryerContext } from "@/context/dryerContext";

const useDryerContext = () => {
  const context = useContext(DryerContext);

  if (!context) {
    throw new Error("useDryerContext must be used within an AuthProvider");
  }
  return context;
};

export default useDryerContext;
