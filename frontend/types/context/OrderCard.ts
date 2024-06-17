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
  totalNumber: number;
  ordersAddress : {latitude : number  , longitude: number , address: string} | null;
  setOrdersAddress: Dispatch<SetStateAction<{latitude : number , longitude: number , address: string } | null>>
};

export type InformationForDelete = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
  clothingId: string;
  serviceType: string;
  type: string;
} | null;
