'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import LoadingPage from '@/components/Loading/LoadingPage';
import HeaderComponent from '@/components/customerApp/headerComponent/HeaderComponent';
import NeshanDriver from '@/components/neshan-map/NeshanDriver';

export default function page() {
    const searchParams = useSearchParams();
    const latitude = searchParams.get('latitude');
    const longitude = searchParams.get('longitude');

    if(!latitude && !longitude){
      return <LoadingPage/>
    }
    console.log( typeof latitude);
    
    // console.log(latitude , longitude);
    
  return (
    <div
    style={{ height: `calc(100vh - 220px)` }}
    className="mx-auto w-full sm:w-5/6 md:w-5/6 lg:w-4/6  shadow-xl  overflow-auto border border-sky-500"
  >
    <HeaderComponent title='آدرس مشتری' as="header"/>
    <NeshanDriver latitude={Number(latitude)} longitude={Number(longitude)}/>
  </div>
  )
}
