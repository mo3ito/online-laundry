'use client'
import HeaderComponent from '@/components/customerApp/headerComponent/HeaderComponent'


export default function page() {
  return (
    <div
    style={{ height: `calc(100vh - 254px)` }}
    className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto"
  >
    <HeaderComponent title="سفارشات شما" as="header" className='sticky top-0 bg-slate-100' />
    <ul className='w-full h-max p-6'>
    

        <li className=' border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl'>
        <div className='flex justify-between items-center mb-3'>
        <p>نوع لباس</p>
        <p>کت و شلوار</p>
        </div>
        <div className='flex justify-between items-center mb-3'>
        <p>تعداد</p>
        <p> 2 عدد</p>
        </div>
        <div className='flex justify-between items-center mb-3'>
        <p>نوع خدمات</p>
        <p> اتو و خشکشویی</p>
        </div>

        <div className='flex justify-between items-center mb-3'>
        <p>مبلغ</p>
        <p> 200 هزار تومان</p>
        </div>
        </li>


        <li className=' border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl'>
        <div className='flex justify-between items-center mb-3'>
        <p>نوع لباس</p>
        <p>کت و شلوار</p>
        </div>
        <div className='flex justify-between items-center mb-3'>
        <p>تعداد</p>
        <p> 2 عدد</p>
        </div>
        <div className='flex justify-between items-center mb-3'>
        <p>نوع خدمات</p>
        <p> اتو و خشکشویی</p>
        </div>

        <div className='flex justify-between items-center mb-3'>
        <p>مبلغ</p>
        <p> 200 هزار تومان</p>
        </div>
        </li>
        


        


        
    </ul>
  </div>
  )
}
