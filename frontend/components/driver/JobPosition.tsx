import React from 'react'

export default function JobPosition({content}:{content: string}) {
  return (
    <div className='w-full h-10 bg-sky-600 '>
      <article className='flex items-center justify-between h-full px-3'>
      <h1>سمت شما</h1>
      <p>{content}</p>
      </article>
    </div>
  )
}
 