'use client'
import HeaderComponent from '@/components/customerApp/headerComponent/HeaderComponent'
import React from 'react'

export default function page() {
  return (
    <div
    style={{ height: `calc(100vh - 248px)` }}
    className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
  >
        <HeaderComponent title='سفارشات ثبت شده'/>
    </div>
  )
}
