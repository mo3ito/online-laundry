import { OrderCardType } from "@/context/order-card";

const allCountOrders = (ordersArray: OrderCardType[]) => {
  const allCounts = ordersArray?.reduce(
    (total, order) => total + order?.count,1);

  console.log(allCounts);

  return allCounts;
};

export default allCountOrders;
