'use client';

import { useState, useRef, MouseEvent, useContext } from "react";
import { OrderCardContextType } from "@/types/context/orderCard";
import addClothingHandler from "@/app/utils/addClothingHandler";
import minesClothingHandler from "@/app/utils/minesClothingHandler";
import deleteClothingHandler from "@/app/utils/deleteClothingHandler";
import { OrderCardContext } from "@/context/order-card";

export default function InformationClothingsItem() {
  const [isShowAddCloths, setIsShowAddCloths] = useState(false);
  const addClothsBoxRef = useRef<HTMLDivElement | null>(null);
  const orderContext = useContext<OrderCardContextType | null>(OrderCardContext);
  const { orders, setOrders } = orderContext as OrderCardContextType ;




  const showAddClothsHandler = (event: MouseEvent) => {
    if (
      addClothsBoxRef.current &&
      !addClothsBoxRef.current.contains(event.target as Node)
    ) {
      setIsShowAddCloths((prev) => !prev);
    }
  };

  // const deleteClothingHandler = (clothingId : string)=>{
  //  const newOrderList = orders.filter(order=> order.id !== clothingId )
  //  setOrders(newOrderList)
  // }



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
              className="size-6"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
            </svg>
          </button>
        </header>

        <ul className="translate-y-2">
          <li className="flex items-center justify-between  w-[500px]  mb-3">
            <p className="w-4/12 ">شستشو و اتو بخار</p>
            <p className="w-4/12 ">200000 هزار تومان</p>
            <div className="w-4/12   flex items-center justify-between">
              <button onClick={()=>addClothingHandler( orders , setOrders  ,"clk vndkvnfvj" ," شستشو و اتو بخار ", "کت و شلوار" , 1 , 2000 , 2000)} className="h-7 w-9 rounded-lg bg-sky-200  text-lg">
                +
              </button>
              <button onClick={()=>minesClothingHandler( orders ,"clk vndkvnfvj" , setOrders , 2000 , 1)} className="h-7 w-9 rounded-lg bg-sky-200  text-lg">
                -
              </button>
              <button onClick={()=>deleteClothingHandler(orders , setOrders , "clk vndkvnfvj")} className="h-7 w-9 rounded-lg bg-sky-200  text-lg flex items-center justify-center">
              <svg className="size-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
              </button>
            </div>
          </li>

          <li className="flex items-center justify-between  w-[500px]  mb-3">
            <p className="w-4/12 ">اتو بخار</p>
            <p className="w-4/12 ">1398 هزار تومان</p>
            <div className="w-4/12   flex items-center justify-between">
              <button onClick={()=>addClothingHandler( orders , setOrders  ,"clk vndkvnf22" ,"  اتو بخار ", "کت و شلوار" , 1 , 2000 , 2000)} className="h-7 w-9 rounded-lg bg-sky-200  text-lg">
                +
              </button>
              <button onClick={()=>minesClothingHandler( orders ,"clk vndkvnf22" , setOrders  , 2000 , 1)} className="h-7 w-9 rounded-lg bg-sky-200  text-lg">
                -
              </button>
              <button onClick={()=>deleteClothingHandler(orders , setOrders , "clk vndkvnf22")} className="h-7 w-9 rounded-lg bg-sky-200  text-lg flex items-center justify-center">
              <svg className="size-5 " xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M4 8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8ZM6 10V20H18V10H6ZM9 12H11V18H9V12ZM13 12H15V18H13V12ZM7 5V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V5H22V7H2V5H7ZM9 4V5H15V4H9Z"></path></svg>
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
