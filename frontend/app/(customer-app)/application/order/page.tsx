'use client'
import HeaderComponent from '@/components/customerApp/headerComponent/HeaderComponent'
import useOrderCardContext from '@/hooks/useOrderCardContext'


export default function page() {
  const {orders} = useOrderCardContext()
  console.log(orders);
  
  return (
    <div
    style={{ height: `calc(100vh - 248px)` }}
    className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
  >
    <HeaderComponent title="سفارشات شما" as="header" className='sticky top-0 bg-slate-100' />
    <ul className='w-full h-max p-6'>
    
      {
        orders.map(order=>
          <li className=' border-2 border-sky-200 bg-sky-100 p-3 rounded-lg mb-4 shadow-xl max-[280px]:text-xs text-sm sm:text-base'>
            <article>
          <div className='flex max-[280px]:justify-start justify-between items-center mb-3 gap-x-4'>
          <p>نوع لباس</p>
          <p className=''>{order.typeClothing}</p>
          </div>
          <div className='flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2'>
          <p>نوع خدمات</p>
          <p>{order.serviceType}</p>
          </div>
          <div className='flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2'>
          <p>مبلغ واحد</p>
          <p>{Number(order.cost).toLocaleString("en-US")}</p>
          </div>
          <div className='flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2'>
          <p>تعداد</p>
          <p>{order.count}</p>
          </div>
          <div className='flex max-[280px]:justify-start justify-between  items-center mb-3 gap-x-2'>
          <p>مبلغ</p>
          <p>{Number(order.totalCost).toLocaleString("en-US")}</p>
          </div>
          </article>
          </li>
          )
      } 
    </ul>
  </div>
  )
}
