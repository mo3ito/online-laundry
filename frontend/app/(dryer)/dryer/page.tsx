"use client";
import React, { useEffect } from "react";
import Link from "next/link";
import LoadingPage from "@/components/Loading/LoadingPage";
import useGetReactQuery from "@/hooks/useGetReactQuery";
import useAuthContext from "@/hooks/useAuthContext";
import { DRYER_ORDERS } from "@/routeApi/endpoints";
import useDryerContext from "@/hooks/useDryerContext";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

export default function page() {
  const { infos } = useAuthContext();
  const { setTotalOrders } = useDryerContext();
  const { data, isLoading } = useGetReactQuery(infos?._id, DRYER_ORDERS, [
    "get recived orders",
  ]);
  const router = useRouter();

  useEffect(() => {
    if (data) {
      setTotalOrders(data.data.length);
    }
  }, [data]);

  const sendToHrefHandler = (href: string) => {
    if (!infos?.is_register_by_admin) {
      toast.warn("اطلاعات شما توسط مدیریت تایید نشده");
    } else {
      router.push(href);
    }
  };

  if (isLoading) {
    return <LoadingPage />;
  }
  return (
    <main
      style={{ height: `calc(100vh - 128px)` }}
      className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500 "
    >
      <section className="w-full h-full flex flex-col items-center  gap-y-4 px-6  sm:px-8 text-lg py-3 overflow-y-auto">
        <button
          onClick={() => sendToHrefHandler("/dryer/orders/service")}
          className="w-full h-40 bg-yellow-300 rounded-lg flex items-center justify-center flex-col"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
          </svg>
          سفارشات
        </button>
        <button
          onClick={() => sendToHrefHandler("/dryer/orders/unsettled-orders")}
          className="w-full h-40 bg-green-300 rounded-lg flex flex-col items-center justify-center"
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M17.0047 16.0027H19.0047V4.00275H9.00468V6.00275H17.0047V16.0027ZM17.0047 18.0027V21.0019C17.0047 21.5546 16.5547 22.0027 15.9978 22.0027H4.01154C3.45548 22.0027 3.00488 21.5581 3.00488 21.0019L3.00748 7.00362C3.00759 6.45085 3.45752 6.00275 4.0143 6.00275H7.00468V3.00275C7.00468 2.45046 7.4524 2.00275 8.00468 2.00275H20.0047C20.557 2.00275 21.0047 2.45046 21.0047 3.00275V17.0027C21.0047 17.555 20.557 18.0027 20.0047 18.0027H17.0047ZM7.00468 16.0027V18.0027H9.00468V19.0027H11.0047V18.0027H11.5047C12.8854 18.0027 14.0047 16.8835 14.0047 15.5027C14.0047 14.122 12.8854 13.0027 11.5047 13.0027H8.50468C8.22854 13.0027 8.00468 12.7789 8.00468 12.5027C8.00468 12.2266 8.22854 12.0027 8.50468 12.0027H13.0047V10.0027H11.0047V9.00275H9.00468V10.0027H8.50468C7.12397 10.0027 6.00468 11.122 6.00468 12.5027C6.00468 13.8835 7.12397 15.0027 8.50468 15.0027H11.5047C11.7808 15.0027 12.0047 15.2266 12.0047 15.5027C12.0047 15.7789 11.7808 16.0027 11.5047 16.0027H7.00468Z"></path>
          </svg>
          سفارشات تسویه نشده
        </button>
        <Link
          href="/dryer/edit-information"
          className="w-full h-40 bg-pink-300 rounded-lg flex flex-col items-center justify-center "
        >
          <svg
            className="size-20 fill-zinc-600"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M5 18.89H6.41421L15.7279 9.57627L14.3137 8.16206L5 17.4758V18.89ZM21 20.89H3V16.6473L16.435 3.21231C16.8256 2.82179 17.4587 2.82179 17.8492 3.21231L20.6777 6.04074C21.0682 6.43126 21.0682 7.06443 20.6777 7.45495L9.24264 18.89H21V20.89ZM15.7279 6.74785L17.1421 8.16206L18.5563 6.74785L17.1421 5.33363L15.7279 6.74785Z"></path>
          </svg>
          ویرایش اطلاعات
        </Link>
      </section>
    </main>
  );
}
