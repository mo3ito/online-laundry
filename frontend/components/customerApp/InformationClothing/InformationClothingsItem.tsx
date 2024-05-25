'use client';

import { useState, useRef, MouseEvent, useContext } from "react";
import { OrderCard , OrderCardType , OrderCardContextType } from "@/context/order-card";

export default function InformationClothingsItem() {
  const [isShowAddCloths, setIsShowAddCloths] = useState(false);
  const addClothsBoxRef = useRef<HTMLDivElement | null>(null);
  const orderContext = useContext<OrderCardContextType | null>(OrderCard);
  const { orders, setOrders } = orderContext as OrderCardContextType ;

  const showAddClothsHandler = (event: MouseEvent) => {
    if (
      addClothsBoxRef.current &&
      !addClothsBoxRef.current.contains(event.target as Node)
    ) {
      setIsShowAddCloths((prev) => !prev);
    }
  };

  const addClothingHandler = (id: string, serviceType: string, typeClothing: string ,count: number, cost: number , totalCost: number) => {
    
    const newOrder: OrderCardType = {
      id,
      serviceType,
      typeClothing,
      count,
      cost,
      totalCost
    };
    
    const hasSimilarOrder = orders.some(order => order.typeClothing === typeClothing && order.serviceType === serviceType);
    
    if (!hasSimilarOrder) {
      setOrders(prevOrders => [...prevOrders, newOrder]);
    } else {
      const updatedOrders = orders.map(order => {
        if (order.typeClothing === typeClothing && order.serviceType === serviceType) {
          return {
            ...order,
            count: order.count + count,
            totalCost: order.totalCost + cost,
          };
        }
        return order;
      });
      setOrders(updatedOrders);
    }

  };

  const minesClothingHandler = (id: string, serviceType: string, typeClothing: string, count: number, cost: number, totalCost: number) => {
    const isOrder = orders.find(order => order.id === id);
  
    if (isOrder) {
      const updatedOrders = orders.map(order => {
        if (order.id === isOrder.id) {
          const updatedCount = order.count - count <= 0 ? 1 : order.count - count;
          const updateTotalCost = order.totalCost - totalCost
          return {
            ...order,
            count: updatedCount,
            totalCost: updateTotalCost
          };
        }
        return order;
      });
      setOrders(updatedOrders);
    }
  };

  console.log(orders);
  

  return (
    <li
      onClick={showAddClothsHandler}
      className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl cursor-pointer"
    >
      <section
        className={`${isShowAddCloths ? "hidden" : "block"} text-center`}
      >
        <h2>کت و شلوار مردانه</h2>
        <p>(دست)</p>
        <p>110000 - 190000</p>
      </section>
      <section
        ref={addClothsBoxRef}
        className={`${
          isShowAddCloths ? "block" : "hidden"
        } w-max h-full cursor-auto pt-3`}
      >
        <header className="flex justify-between items-center">
          <h1 className="font-bold">خدمات</h1>
          <button onClick={() => setIsShowAddCloths(false)} className="">
            <svg
              className="size-5"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
            </svg>
          </button>
        </header>

        <ul className="translate-y-2">
          <li className="flex items-center justify-between  w-96  mb-3">
            <p className="w-5/12 ">شستشو و اتو بخار</p>
            <p className="w-4/12 ">200000 هزار تومان</p>
            <div className="w-3/12  text-left">
              <button onClick={()=>addClothingHandler( "clk vndkvnfvj" ," شستشو و اتو بخار ", "کت و شلوار" , 1 , 2000 , 2000)} className="px-3 rounded-lg bg-sky-200 ml-1 text-lg">
                +
              </button>
              <button onClick={()=>minesClothingHandler( "clk vndkvnfvj" ," شستشو و اتو بخار ", "کت و شلوار" , 1 , 2000 , 2000)} className="px-3 rounded-lg bg-sky-200 mr-1 text-lg">
                -
              </button>
            </div>
          </li>

          <li className="flex items-center justify-between  w-96  mb-3">
            <p className="w-5/12 ">اتو بخار</p>
            <p className="w-4/12 ">1398 هزار تومان</p>
            <div className="w-3/12  text-left">
              <button className="px-3 rounded-lg bg-sky-200 ml-1 text-lg">
                +
              </button>
              <button className="px-3 rounded-lg bg-sky-200 mr-1 text-lg">
                -
              </button>
            </div>
          </li>
        </ul>
      </section>
      <img
        className="size-32 rounded-xl p-2"
        src="/images/washing-machine.jpg"
        alt="Washing Machine"
      />
    </li>
  );
}
