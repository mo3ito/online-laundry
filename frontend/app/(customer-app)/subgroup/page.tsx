import React from "react";
import SubgroupShow from "@/components/customerApp/SubgroupShow";

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 254px)` }}
      className="w-full  bg-slate-100 border border-sky-500  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto "
    >
      <SubgroupShow />
    </div>
  );
}
