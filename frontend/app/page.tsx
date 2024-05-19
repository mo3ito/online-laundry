import Image from "next/image";

export default function Home() {
  return (
   <main>
    <div className=" container mx-auto px-6 w-full flex my-10">
      <div >

      </div>
    <img src="/images/washing-machine.jpg" alt="washing machine" className="w-1/2 "/>
    <div className="w-1/2">
    <div className="w-full h-full flex flex-col items-center justify-center gap-y-6">
      <h1 className="text-4xl">مسیتو پاک</h1>
    <p className="text-3xl">لباسشویی و خشکشویی آنلاین در اراک</p>
    <p className="text-3xl">دریافت و تحویل درب منزل</p>
    </div>
    </div>
 
    </div>
   </main>
  );
}
