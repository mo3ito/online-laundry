import { Dispatch, SetStateAction } from "react";

export type OrderCardType = {
  id: string;
  typeClothing: string;
  serviceType: string;
  count: number;
  cost: number;
  totalCost: number;
};

export type OrderCardContextType = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
};
