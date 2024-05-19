'use client'

export default function Header() {
  return (
    <header className=' h-max w-full  mx-auto bg-gray-200  '>
        <div className="container mx-auto px-6 py-3 ">
            <div className=" w-full flex items-center justify-between mb-3">
     <div className="flex items-center gap-x-2 ">
        <img src="/images/tshirt_2887535.png" className=" w-12 h-12" alt="T-shirt icon" />
        <div>
            <h1 className="font-bold text-xl text-sky-600">مسیتو پاک</h1>
            <p className="text-sm">خشکشویی آنلاین</p>
        </div>
    </div>   
    <div className="text-white">
        <button className="bg-sky-600 px-2 py-2 rounded-md ml-2">ثبت سفارش</button>
        <button className="bg-sky-600 px-2 py-2 rounded-md">دریافت اپلیکیشن</button>
        </div>
        </div>
     <nav>  
     <ul className="bg-gray-500 w-full h-16 flex items-center justify-between rounded-md">
        <li className=" hover:bg-sky-500 w-1/4 h-full flex items-center justify-center cursor-pointer text-white transition-all delay-75  ease-out ">خانه</li>
        <li className=" hover:bg-sky-500 w-1/4 h-full flex items-center justify-center cursor-pointer text-white transition-all delay-75  ease-out">خدمات خشکشویی</li>
        <li className=" hover:bg-sky-500 w-1/4 h-full flex items-center justify-center cursor-pointer text-white transition-all delay-75  ease-out">قیمت خشکشویی</li>
        <li className=" hover:bg-sky-500 w-1/4 h-full flex items-center justify-center cursor-pointer text-white transition-all delay-75  ease-out">تماس با ما</li>
    </ul>
    </nav>    
        </div>
    </header>
  )
}
