'use client'
import LaundryMenu from "@/components/customerApp/laundry-menu/LaundryMenu";
import BottomMenu from "@/components/customerApp/BottomMenu";
import NeshanMap from "@/components/neshan-map/NeshanMap";

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 176px)` }}
      className="w-full  bg-slate-100 border border-sky-500  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto "
    >
      {/* <LaundryMenu title="خشکشویی" />
      <LaundryMenu title="رنگرزی" /> */}
      <NeshanMap/>
      <BottomMenu />
    </div>
  );
}
