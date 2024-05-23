import SwiperMenu from "./swiper/SwiperMenu";

export default function SubgroupShow() {
  return (
    <div>
      <header className="sticky top-0 bg-slate-100  z-10">
        <SwiperMenu />
        <h1 className="font-bold text-center py-1">مردانه</h1>
      </header>
      <main className="px-8  ">
        <section>
        <ul className="w-full  ">
        <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl">
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

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl">
                <article className="text-center">
                  <h2>کت مردانه</h2>
                  <p>(عدد)</p>
                  <p>110000 - 190000</p>
                </article>
                <img
                  className="size-32 rounded-xl p-2"
                  src="/images/washing-machine.jpg"
                  alt="Washing Machine"
                />
              </li>

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl">
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

              <li  className="w-full h-32 bg-white flex items-center justify-between px-4 mb-4 rounded-xl shadow-xl">
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
