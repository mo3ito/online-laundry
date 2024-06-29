"use client";
import { useContext } from "react";
import Link from "next/link";
import { OrderCardContext } from "@/context/order-card";
import { OrderCardContextType } from "@/types/context/OrderCard";

export default function BottomMenuDriver() {
  const orderContext = useContext<OrderCardContextType | null>(
    OrderCardContext
  );
  const { totalNumber, totalNumberRegisterdOrders } =
    orderContext as OrderCardContextType;

  return (
    <div className=" pt-3 h-20 bg-sky-500 border-t sticky bottom-0 flex items-center justify-between sm:justify-around px-8  mx-auto border border-sky-500  shadow-xl sm:w-5/6 md:w-5/6 lg:w-4/6  ">
      <Link href="/application">
        <svg
          className=" size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M20 20C20 20.5523 19.5523 21 19 21H5C4.44772 21 4 20.5523 4 20V11L1 11L11.3273 1.6115C11.7087 1.26475 12.2913 1.26475 12.6727 1.6115L23 11L20 11V20ZM8 15V17H16V15H8Z"></path>
        </svg>
      </Link>
      <Link href="/driver/orders/get" className="relative">
        <svg
          className="size-8 fill-white"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="currentColor"
        >
          <path d="M19 22H5C3.34315 22 2 20.6569 2 19V3C2 2.44772 2.44772 2 3 2H17C17.5523 2 18 2.44772 18 3V15H22V19C22 20.6569 20.6569 22 19 22ZM18 17V19C18 19.5523 18.4477 20 19 20C19.5523 20 20 19.5523 20 19V17H18ZM16 20V4H4V19C4 19.5523 4.44772 20 5 20H16ZM6 7H14V9H6V7ZM6 11H14V13H6V11ZM6 15H11V17H6V15Z"></path>
        </svg>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute right-[5px] -top-3 text-sm ">
          {totalNumberRegisterdOrders}
        </div>
      </Link>

      <Link href="/driver/orders/send" className="relative">
        <svg
          className="size-10 fill-white"
          version="1.1"
          id="Capa_1"
          xmlns="http://www.w3.org/2000/svg"
          width="800px"
          height="800px"
          viewBox="0 0 564.188 564.188"
        >
          <g>
            <g>
              <path
                d="M45.422,339.428h-4.781h-24.48h-4.208C5.365,339.428,0,344.792,0,351.381v23.896c0,6.599,5.365,11.963,11.953,11.963h4.15
			h29.319c6.588,0,11.953-5.364,11.953-11.953v-19.125v-4.781C57.375,344.792,52.01,339.428,45.422,339.428z"
              />
              <path
                d="M500.894,387.24c-2.295-3.424-3.644-7.535-3.644-11.953v-19.125v-4.781c0-11.857,9.658-21.516,21.516-21.516h26.297
			v-9.562c0-3.662,0.373-7.459-0.555-10.959c-1.635-6.158-3.882-12.039-6.933-17.633c-6.053-11.083-14.649-20.693-24.509-28.525
			c-10.069-7.994-21.42-14.219-33.191-19.325c-5.881-2.554-11.896-4.743-17.91-6.952c-3.175-1.167-6.475-2.047-9.792-2.764
			c-1.664-0.363-3.328-0.679-5.011-0.938c-0.698-0.104-4.093-0.076-4.466-0.545l-92.632-107.301c0,0-208.797-20.617-282.725,64.557
			c-14.927,17.193-25.389,33.956-32.876,50.231c-12.116-8.28-25.991-30.236-25.991-30.236L0.45,228.254l22.778,43.165
			c-6.56,22.519-7.315,41.673-7.191,58.446h29.386c11.857,0,21.516,9.658,21.516,21.516v23.896c0,4.428-1.348,8.539-3.644,11.953
			h33.211c4.819,30.467,31.126,53.789,62.95,53.789c31.824,0,58.13-23.322,62.95-53.789h19.689h88.73
			c4.819,30.467,31.126,53.789,62.95,53.789s58.13-23.322,62.95-53.789h19.908C484.398,387.24,492.172,387.24,500.894,387.24z
			 M76.5,219.41c0,0,38.25-48.1,143.438-61.43v85.823H76.5V219.41z M159.455,414.876c-17.308,0-31.729-11.733-36.137-27.636
			c-0.889-3.213-1.521-6.531-1.521-10.021c0-20.799,16.859-37.657,37.657-37.657s37.657,16.858,37.657,37.657
			c0,3.49-0.631,6.809-1.521,10.021C191.183,403.143,176.753,414.876,159.455,414.876z M513.688,275.742
			c0.02,0.02,0.029,0.029,0.048,0.048c15.281,16.313,20.646,31.508,21.707,34.941h-42.018h-5.345
			C488.729,291.95,494.936,283.64,513.688,275.742z M248.625,155.886c76.5-6.79,84.867-3.863,84.867-3.863l49.008,56.428
			l-11.656,35.353H248.625V155.886z M393.774,414.876c-17.309,0-31.729-11.733-36.137-27.636c-0.89-3.213-1.521-6.531-1.521-10.021
			c0-20.799,16.858-37.657,37.657-37.657c20.798,0,37.657,16.858,37.657,37.657c0,3.49-0.632,6.809-1.521,10.021
			C425.503,403.143,411.072,414.876,393.774,414.876z"
              />
              <path
                d="M547.453,339.428h-2.391h-26.297c-6.589,0-11.953,5.364-11.953,11.953v23.896c0,6.589,5.364,11.953,11.953,11.953h26.297
			h7.172c6.589,0,11.953-5.364,11.953-11.953v-19.115C564.188,346.925,556.69,339.428,547.453,339.428z"
              />
            </g>
          </g>
        </svg>
        <div className="size-5 rounded-full text-white flex items-center justify-center bg-sky-700 absolute right-[5px] -top-3 text-sm ">
          {totalNumber}
        </div>
      </Link>
    </div>
  );
}
