import Headline from "./Headline";

export default function Introduction() {
  return (
    <div className="mt-28">
      <Headline title=" خشکشویی آنلاین مسیتو پاک" />
      <div className=" container mx-auto px-4 sm:px-6 w-full flex flex-col sm:flex-row ">
        <img
          src="/images/washing-machine.jpg"
          alt="washing machine"
          className=" w-full sm:w-1/2 "
        />
        <div className=" w-full sm:w-1/2">
          <p className=" text-sm mt-2 sm:mt-0 sm:text-base lg:text-lg  sm:pr-10">
          اگر به دنبال خشکشویی آنلاین در اراک هستید؛ خشکشویی مسیتو پاک بهترین انتخاب شماست. تخصص ما شستشوی لباس با استفاده از جدیدترین روش های علمی و مدرن ترین ابزارهای شستشو و خشکشویی صنعتی است.
            <br/>
            ما لباس‌های شما را درب منزل تحویل می‌گیریم و پس از انجام سفارشات شما آن را تحویل شما می‌دهیم.
          </p>
        </div>
      </div>
    </div>
  );
}
