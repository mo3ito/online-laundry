import React from "react";

export default function Page() {
  return (
    <div className="container mx-auto px-6 py-3">
      <header className="w-full h-20 bg-sky-200 flex items-center justify-center rounded-lg">
        <h1 className="text-xl font-bold">لیست قیمت‌ها</h1>
      </header>

      <section className="my-5 bg-gray-200 p-3 rounded-lg">
        <h2 className="font-bold text-lg pb-3">اطلاعیه</h2>
        <p>
          قیمت‌های البسه روشن و سفید، چین دار و غیر معمول، لباس عروس، لباس مجلسی
          و ... به صورت توافقی و بعد از رویت لباس توسط کارشناس تعیین می گردد. در
          صورت وجود لکه، حتما آن را به کارشناسان ما نشان دهید تا لکه گیری شود.
        </p>
      </section>
    </div>
  );
}
