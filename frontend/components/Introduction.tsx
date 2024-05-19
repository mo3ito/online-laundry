import Headline from "./Headline";

export default function Introduction() {
  return (
    <div className="mt-10 mb-20">
      <Headline title=" خشکشویی آنلاین مسیتو پاک" />
      <div className=" container mx-auto px-6 w-full flex text-zinc-600">
        <img
          src="/images/washing-machine.jpg"
          alt="washing machine"
          className="w-1/2 "
        />
        <div className="w-1/2">
          <p className="text-xl pr-10">
          اگر به دنبال خشکشویی آنلاین در اراک هستید؛ خشکشویی مسیتو پاک بهترین انتخاب شماست. تخصص ما شستشوی لباس با استفاده از جدیدترین روش های علمی و مدرن ترین ابزارهای شستشو و خشکشویی صنعتی است.
            <br/>
            ما لباس‌های شما را درب منزل تحویل می‌گیریم و پس از انجام سفارشات شما آن را تحویل شما می‌دهیم.
          </p>
        </div>
      </div>
    </div>
  );
}
