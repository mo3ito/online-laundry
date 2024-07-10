'use client'
import React, { useState } from 'react'
import LogoName from '@/components/customerApp/share/LogoName'
import { adminMnuItems } from '@/data/data'
import linkHandler from '@/utils/linkHandler'
import { useRouter } from 'next/navigation'

export default function AdminMobileHeader() {
  const [isSideMenu , setIsSideMenu]=useState<boolean>(false)
  const [isShowAccordion , setIshowAccordion]=useState<boolean[]>(new Array(adminMnuItems.length).fill(false))
  const router = useRouter()

  const showAccordionHandler = (index : number)=>{
    setIshowAccordion(prev=> prev.map((item , i)=> i === index ? !item : item ) )
  }

  return (
    <section className='w-full h-14 bg-sky-500 sm:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-4'>
      <button onClick={()=>setIsSideMenu(prev=>!prev)} className='size-max '>
      <svg className='size-7 fill-white' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M3 4H21V6H3V4ZM3 11H21V13H3V11ZM3 18H21V20H3V18Z"></path></svg>
      </button>
      
      <LogoName isLink={true} href="/admin"/>

      <aside className={`${isSideMenu ? 'right-0' : '-right-96'} max-[320px]:w-56 max-[480px]:w-72 w-96  bg-sky-400 fixed  inset-y-0 py-16 transition-all duration-200 ease-in`}>
        <button onClick={()=>setIsSideMenu(false)} className='size-max'>
        <svg className='size-6 absolute left-2 top-3' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path></svg>
        </button>
     
      <ul className='w-full h-max max-[320px]:text-sm max-[480px]:text-sm '>
        { adminMnuItems.map((item , index)=>
        <li  key={item.id} onClick={()=>showAccordionHandler(index)} className='w-full h-max  border-y border-zinc-200 '>
        <div className='flex items-center justify-between px-4 h-12  max-[480px]:h-10'>
        <p className=''>{item.name}</p>
        { !isShowAccordion[index] ? <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 10.8284L7.0502 15.7782L5.63599 14.364L11.9999 8L18.3639 14.364L16.9497 15.7782L11.9999 10.8284Z"></path></svg>
       : <svg className='size-6' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"><path d="M11.9999 13.1714L16.9497 8.22168L18.3639 9.63589L11.9999 15.9999L5.63599 9.63589L7.0502 8.22168L11.9999 13.1714Z"></path></svg>}
        </div>
        <ul className='w-full h-max bg-sky-200 '>
        { item.list?.map(listItem=>
       isShowAccordion[index] &&  <li key={listItem.id} onClick={()=>linkHandler(listItem.path , setIsSideMenu ,router)} className=' px-6 flex items-center  h-12  max-[480px]:h-10 border-b border-sky-400 cursor-pointer'>{listItem.itemName}</li>
          ) }
        </ul>
      </li>
        ) }

      </ul>
      </aside>
    </section>
  )
}
