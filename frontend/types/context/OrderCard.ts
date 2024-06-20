import { Dispatch, SetStateAction } from "react";

export type OrderCardType = {
  id: string;
  type_clothing: string;
  service_type: string;
  count: number;
  cost: number;
  totalCost: number;
};

export type Orders = {
  id: string;
  service_type: string;
  type_clothing: string;
  count: number;
  cost: number;
  totalCost: number;
};



export type OrderCardContextType = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
  totalNumber: number;
  setTotalNumber: Dispatch<SetStateAction<number>>;
  totalNumberRegisterdOrders: number;
  setTotalNumberRegisterdOrders: Dispatch<SetStateAction<number>>;
};

export type InformationForDelete = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
  clothingId: string;
  service_type: string;
  type: string;
} | null;
