import React from 'react'
import HeaderComponent from '@/components/customerApp/headerComponent/HeaderComponent'
import DefaultButton from '@/components/share/defaultButton'

export default function page() {
  return (
    <div
    style={{ height: `calc(100vh - 220px)` }}
    className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
  >
    <HeaderComponent title='سفارشات ارسالی'/>
   <ul className="w-full h-max pt-6 px-6 sm:pt-8 sm:px-8">
   <li
            key={"ffff"}
            className=" border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base"
          >
            <article>
              <div className="flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4">
                <p>نام</p>
                <p className="">میلاد</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>نام خانوادگی</p>
                <p>انتظامی</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>شماره موبایل</p>
                <p>09375788892</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>آدرس</p>
                <p>اراک</p>
              </div>
              <div className="flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2">
                <p>مبلغ کل</p>
                <p>500 تومان</p>
              </div>
              <div className='w-full flex items-center justify-center gap-x-3 '>
                <DefaultButton content='نمایش آدرس' className='w-1/2 h-10 !bg-pink-500 rounded-lg text-white'/>
                <DefaultButton content='نمایش کل سفارش' className='w-1/2 h-10 bg-sky-500 rounded-lg text-white'/>
              </div>

            </article>
          </li>
    </ul>
  </div>
  )
}
