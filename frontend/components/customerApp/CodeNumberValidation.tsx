'use client';

import React, { useRef } from 'react';

export default function CodeNumberValidation() {
  const elemsRefs = useRef([]);

  const autoTab = e => {
    const BACKSPACE_KEY = 8;
    const DELETE_KEY = 46;
    let tabindex = e.target.getAttribute('data-index') || 0;
    tabindex = Number(tabindex);
    let elem = null;

    if (e.keyCode === BACKSPACE_KEY) {
      elem = tabindex > 0 && elemsRefs.current[tabindex - 1];
    } else if (e.keyCode !== DELETE_KEY) {
      elem = tabindex < elemsRefs.current.length - 1 && elemsRefs.current[tabindex + 1];
    }

    if (elem) {
      elem.focus();
    }
  };

  return (
    <div className='fixed inset-0 w-full h-screen bg-slate-100 z-50 flex items-center justify-center'>
      {Array.from({ length: 5 }).map((_, index) => (
        <input
          key={index}
          className='w-12 h-16 border border-sky-500 outline-none mr-3 pl-4 text-2xl'
          type="tel"
          maxLength={1}
          ref={el => elemsRefs.current[index] = el}
          data-index={index}
          onKeyUp={autoTab}
        />
      ))}
    </div>
  );
}