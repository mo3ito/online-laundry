"use client";
import { useRef , useEffect , useState} from "react";
import LogoutButton from "./share/buttons/LogoutButton";
import InformationButton from "./share/buttons/InformationButton";
import ShowName from "./ShowName";
import IncreaseCredit from "./share/buttons/IncreaseCredit";

export default function Header() {


  

  return (
    <header  className="bg-sky-500 pb-2 max-[280px]:px-3 px-6  sm:px-8 text-white w-full mx-auto shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6 ">
      <div className="flex  justify-between pt-5 ">
        <InformationButton onClick={() => console.log("ff")} />
        <ShowName />
        <LogoutButton onClick={() => console.log("d")} />
      </div>
    <IncreaseCredit/>
    </header>
  );
}
