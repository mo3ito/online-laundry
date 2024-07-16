import React from 'react'

export default function JobPosition({content}:{content: string}) {
  return (
    <div className='w-full text-sm sm:text-base h-7  my-1 bg-sky-600 rounded-lg translate-y-1'>
      <article className='flex items-center justify-between h-full px-3'>
      <h1>سمت شما</h1>
      <p>{content}</p>
      </article>
    </div>
  )
}
 