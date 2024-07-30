import { OrdersTemplate } from "@/types/context/Orders";
import { useEffect, useState } from "react";

const useCalculateOrders = (ordersData: OrdersTemplate[]) => {
  const [allCountOrders, setAllCountOrders] = useState<number>(0);
  const [allTotalPrice, setAllTotalPrice] = useState<number>(0);
  useEffect(() => {
    if (ordersData) {
      const { count, totalCost } = ordersData.reduce(
        (
          acc: { count: number; totalCost: number },
          customer: OrdersTemplate
        ) => {
          const customerOrderCount = customer.orders.reduce(
            (orderAcc, order) => {
              return {
                count: orderAcc.count + order.count,
                totalCost: orderAcc.totalCost + order.totalCost,
              };
            },
            { count: 0, totalCost: 0 }
          );

          return {
            count: acc.count + customerOrderCount.count,
            totalCost: acc.totalCost + customerOrderCount.totalCost,
          };
        },
        { count: 0, totalCost: 0 }
      );

      setAllCountOrders(count);
      setAllTotalPrice(totalCost);
    }
  }, [ordersData]);

  return { allCountOrders, allTotalPrice };
};

export default useCalculateOrders;
