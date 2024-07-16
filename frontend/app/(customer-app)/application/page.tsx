"use client";
import LaundryMenu from "@/components/customerApp/laundry-menu/LaundryMenu";
import { useEffect } from "react";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import useOrderCardContext from "@/hooks/useOrderCardContext";
import LoadingPage from "@/components/Loading/LoadingPage";
import { GET_ORDERS_CUSTOER } from "@/routeApi/endpoints";

export default function page() {
  const { infos } = useAuthContext();
  const { setRegisteredOrders } = useOrderCardContext();
  const { data, isLoading } = useGetReactQuery(infos?._id, GET_ORDERS_CUSTOER, [
    "orders customer",
  ]);

  useEffect(() => {
    if (data) {
      setRegisteredOrders(data.data);
    }
  }, [data]);

  if (isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <main
        style={{ height: `calc(100vh - 80px)` }}
        className="w-full  bg-slate-100 border border-sky-500  mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto pb-10"
      >
        <LaundryMenu title="خشکشویی" />
      </main>
    </>
  );
}
