'use client'
import React, { useRef } from 'react';

export default function OTPInput() {
  const inputRefs = useRef([]);

  const moveToNext = (input, event) => {
    let maxLength = parseInt(input.getAttribute('maxlength'));
    let inputValue = input.value;
    if (event.key === 'Backspace' && inputValue.length === 0) {
      let previousInput = input.previousElementSibling;
      if (previousInput) {
        previousInput.focus();
      }
    } else if (inputValue.length >= maxLength && event.key !== 'Backspace') {
      let nextInput = input.nextElementSibling;
      if (nextInput) {
        nextInput.focus();
      }
    }
  };

  return (
    <>
      <input
        type="tel"
        maxLength="1"
        onKeyUp={(event) => moveToNext(event.target, event)}
        ref={(el) => (inputRefs.current[0] = el)}
      />
      <input
        type="tel"
        maxLength="1"
        onKeyUp={(event) => moveToNext(event.target, event)}
        ref={(el) => (inputRefs.current[1] = el)}
      />
      <input
        type="tel"
        maxLength="1"
        onKeyUp={(event) => moveToNext(event.target, event)}
        ref={(el) => (inputRefs.current[2] = el)}
      />
      <input
        type="tel"
        maxLength="1"
        onKeyUp={(event) => moveToNext(event.target, event)}
        ref={(el) => (inputRefs.current[3] = el)}
      />
    </>
  );
}

// 'use client';

// import React, { useRef, useEffect } from 'react';

// function OTPInput() {
//   const inputRefs = useRef([]);

//   useEffect(() => {
//     inputRefs.current[0].focus();
//   }, []);

//   const handleKeyDown = (e, index) => {
//     if (e.key === 'Backspace' && index > 0) {
//       inputRefs.current[index - 1].focus();
//     } else if (e.target.value.length === 1 && index < 4) {
//       inputRefs.current[index + 1].focus();
//     }
//   };

//   return (
//     <div className="flex justify-center items-center h-screen">
//       <div className="bg-white p-8 rounded-lg shadow-md">
//         <h2 className="text-2xl font-bold mb-4">Enter OTP</h2>
//         <div className="flex justify-center space-x-4">
//           {Array.from({ length: 5 }).map((_, index) => (
//             <input
//               key={index}
//               type="text"
//               maxLength={1}
//               className="w-12 h-12 border border-gray-300 rounded text-center text-2xl focus:outline-none focus:ring-2 focus:ring-blue-500"
//               ref={(el) => (inputRefs.current[index] = el)}
//               onKeyDown={(e) => handleKeyDown(e, index)}
//             />
//           ))}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default OTPInput;