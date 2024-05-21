import React from "react";

export default function page() {
  return (
    <div
      style={{ height: `calc(100vh - 244px)` }}
      className="w-full  bg-slate-100 border-2 shadow-xl mx-auto sm:w-5/6 md:w-5/6 lg:w-4/6 relative"
    >
      <h1 className="w-full bg-sky-500 p-3 my-2 text-center text-white">
        خشکشویی
      </h1>
      <ul className="w-full mt-8 px-8 flex items-center justify-between flex-wrap gap-y-12">
        <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
          <figure className="size-full ">
            <img
              src="/images/washing-machine.jpg"
              className="size-full rounded-xl"
              alt="machine wash"
            />
            <figcaption className="text-center my-5">مردانه</figcaption>
          </figure>
        </li>

        <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
          <figure className="size-full ">
            <img
              src="/images/washing-machine.jpg"
              className="size-full rounded-xl"
              alt="machine wash"
            />
            <figcaption className="text-center my-5">مردانه</figcaption>
          </figure>
        </li>

        <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
          <figure className="size-full ">
            <img
              src="/images/washing-machine.jpg"
              className="size-full rounded-xl"
              alt="machine wash"
            />
            <figcaption className="text-center my-5">مردانه</figcaption>
          </figure>
        </li>

        <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
          <figure className="size-full ">
            <img
              src="/images/washing-machine.jpg"
              className="size-full rounded-xl"
              alt="machine wash"
            />
            <figcaption className="text-center my-5">مردانه</figcaption>
          </figure>
        </li>

        <li className="size-48  bg-sky-300 p-2 rounded-xl cursor-pointer">
          <figure className="size-full ">
            <img
              src="/images/washing-machine.jpg"
              className="size-full rounded-xl"
              alt="machine wash"
            />
            <figcaption className="text-center my-5">مردانه</figcaption>
          </figure>
        </li>


        <div className="w-full h-20 bg-white border-t shadow-xl bottom-0 left-0 absolute"></div>
      </ul>
    </div>
  );
}
