export type Orders = {
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
  