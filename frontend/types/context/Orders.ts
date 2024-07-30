export type OrdersInTemplate = {
  _id: string;
  orders_id: string;
  service_type: string;
  type_clothing: string;
  count: number;
  cost: number;
  totalCost: number;
  created_at: string;
  address: string;
  situation: string;
  is_pay_money: boolean;
  is_debt_settlement_laundry: boolean;
};

export type OrdersTemplate = {
  _id: string;
  customer_id: string;
  name: string;
  last_name: string;
  orders: OrdersInTemplate[];
  phone_number: string;
  address: string;
  latitude: string;
  longitude: string;
  all_count: number;
  all_price: number;
  is_done_all_order: boolean;
  service_laundry: {
    laundry_name: string;
    laundry_address: string;
    laundry_id?: string;
  };
};
