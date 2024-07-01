import { Dispatch, SetStateAction } from "react";

export type OrderCardType = {
  id: string;
  orders_id:string;
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

export type OrdersRegistered = {
  service_type: string;
  type_clothing: string;
  count: number;
  cost: number;
  totalCost: number;
  created_at?: string;
  orders_id: string;
  address: string;
  is_done_order?: boolean;
};




export type OrderCardContextType = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
  totalNumber: number;
  setTotalNumber: Dispatch<SetStateAction<number>>;
  totalNumberRegisterdOrders: number;
  setTotalNumberRegisterdOrders: Dispatch<SetStateAction<number>>;
  setRegisteredOrders : Dispatch<SetStateAction<OrdersRegistered[] | null>>,
  registeredOrders: OrdersRegistered[] | null
};

export type InformationForDelete = {
  orders: OrderCardType[];
  setOrders: Dispatch<SetStateAction<OrderCardType[]>>;
  clothingId: string;
  service_type: string;
  type: string;
} | null;
