import { Dispatch, SetStateAction } from "react";

export type OrdersForDriver = {
  _id: string;
  customer_id: string;
  name: string;
  last_name: string;
  orders: [];
  phone_number: string;
  address: string;
  latitude: string;
  longitude: string;
  all_count: number;
  all_price: number;
};

export type OrdersType = {
  address: string;
  cost: number;
  count: number;
  created_at: string;
  orders_id: string;
  service_type: string;
  totalCost: number;
  type_clothing: string;
  _id: string;
};

export type DataType = {
  allCount: number;
  allPrice: number;
  orders: OrdersType[];
  customer_id: string;
};

export type DefaultModalProps = {
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
  data: DataType | null;
  payOnclick: () => void;
  buttonName: string;
};


export type DriverOrdersShowProps = {
  apiAddress: string;
  header: string;
  buttonName: string;
  isGet: boolean;
};


