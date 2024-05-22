import React from 'react'

export default function IncreaseCredit() {
  return (
    <div className="w-full h-10 bg-sky-600 flex justify-between items-center rounded-lg px-4 ">
    <h1>اعتبار شما</h1>
    <p>0 تومان</p>

    <button className="">
      <svg
        className="size-8"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="currentColor"
      >
        <path d="M4 3H20C20.5523 3 21 3.44772 21 4V20C21 20.5523 20.5523 21 20 21H4C3.44772 21 3 20.5523 3 20V4C3 3.44772 3.44772 3 4 3ZM11 11H7V13H11V17H13V13H17V11H13V7H11V11Z"></path>
      </svg>
    </button>
  </div>
  )
}
