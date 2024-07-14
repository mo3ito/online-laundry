'use client'
import { useParams } from "next/navigation";
import SubgroupShow from "@/components/customerApp/SubgroupShow";
import { useEffect } from "react";

export default function page() {
  const params = useParams()
  console.log(params);

  
  
  return (
    <div
      style={{ height: `calc(100vh - 220px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
    >
      <SubgroupShow />
    </div>
  );
}
