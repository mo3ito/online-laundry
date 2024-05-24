'use client'
import { useState } from "react";
import SubgroupShowHeader from "./SubGroupShowHeader";

export default function SubgroupShow() {

  const [isShowAddCloths , setIsShowAddCloths]= useState(false)

  return (
    <div>
      <SubgroupShowHeader/>
      <main className="px-8  ">
        <section>
        <ul className="w-full  ">
        <li onClick={()=>setIsShowAddCloths(prev=>!prev)} className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl cursor-pointer">
                <article className={`${isShowAddCloths ? 'hidden' : 'block'} text-center`}>
                  <h2>کت و شلوار مردانه</h2>
                  <p>(دست)</p>
                  <p>110000 - 190000</p>
                </article>
                 <div className={`${isShowAddCloths ? "block" : 'hidden'} w-max h-max cursor-auto`}>
                  <h1 className="font-bold">خدمات</h1>
                  <ul className="translate-y-2">
                  <li className="flex items-center justify-between  w-96  mb-3">
                      <p className="w-5/12 ">شستشو و اتو بخار</p>
                      <p className="w-4/12 ">200000 هزار تومان</p>
                      <div className="w-3/12  text-left">
                        <button className="px-3 rounded-lg bg-sky-200 ml-1 text-lg">+</button>
                        <button className="px-3 rounded-lg bg-sky-200 mr-1 text-lg">-</button>
                      </div>
                    </li>

                    <li className="flex items-center justify-between  w-96  mb-3">
                      <p className="w-5/12 ">اتو بخار</p>
                      <p className="w-4/12 ">1398 هزار تومان</p>
                      <div className="w-3/12  text-left">
                        <button className="px-3 rounded-lg bg-sky-200 ml-1 text-lg">+</button>
                        <button className="px-3 rounded-lg bg-sky-200 mr-1 text-lg">-</button>
                      </div>
                    </li>

 

                  </ul>
                </div>
                <img
                  className="size-32 rounded-xl p-2"
                  src="/images/washing-machine.jpg"
                  alt="Washing Machine"
                />
              </li>

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl cursor-pointer">
                <article className="text-center">
                  <h2>کت و شلوار مردانه</h2>
                  <p>(دست)</p>
                  <p>110000 - 190000</p>
                </article>
                <img
                  className="size-32 rounded-xl p-2"
                  src="/images/washing-machine.jpg"
                  alt="Washing Machine"
                />
              </li>

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl cursor-pointer">
                <article className="text-center">
                  <h2>کت و شلوار مردانه</h2>
                  <p>(دست)</p>
                  <p>110000 - 190000</p>
                </article>
                <img
                  className="size-32 rounded-xl p-2"
                  src="/images/washing-machine.jpg"
                  alt="Washing Machine"
                />
              </li>

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl cursor-pointer">
                <article className="text-center">
                  <h2>کت و شلوار مردانه</h2>
                  <p>(دست)</p>
                  <p>110000 - 190000</p>
                </article>
                <img
                  className="size-32 rounded-xl p-2"
                  src="/images/washing-machine.jpg"
                  alt="Washing Machine"
                />
              </li>


        

  
        
        </ul>
        </section>
      </main>
    </div>
    
  );
}
