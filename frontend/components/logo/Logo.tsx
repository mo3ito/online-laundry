import React from 'react'


type LogoType = {
    as?: React.ElementType;
    classNameContainer?: string;

}
export default function Logo({classNameContainer , as : Component = 'div'}:LogoType) {

  

  return (
    <Component className={`${classNameContainer} flex items-center justify-center gap-x-2 bg-sky-200 w-full rounded-t-lg py-2`}>
    <img
      src="/images/tshirt_2887535.png"
      className="w-12 h-12"
      alt="T-shirt icon"
    />
    <div>
      <h1 className="font-bold text-xl text-sky-600">مسیتو پاک</h1>
      <p className="text-sm">خشکشویی آنلاین</p>
    </div>
  </Component>
  )
}
