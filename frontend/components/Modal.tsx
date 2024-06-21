import React, { Dispatch, SetStateAction, useEffect, useRef } from "react";
import useDropDown from "@/hooks/useDropDown";

type ModalProps = {
  messageContent: string;
  confirmOnClick: () => void;
  isShowModal: boolean;
  setIsShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function Modal({
  messageContent,
  confirmOnClick,
  isShowModal = false,
  setIsShowModal,
}: ModalProps) {

  const ModalBoxRef = useRef<HTMLDivElement | null>(null);
  useDropDown(ModalBoxRef , isShowModal , setIsShowModal )



  return (
    <div
      className={`${
        isShowModal ? "flex" : "hidden"
      } w-full h-screen overflow-hidden fixed top-0 left-0 bg-black/65 z-50 flex items-center justify-center  backdrop-blur px-6`}
    >
      <div
        ref={ModalBoxRef}
        role="dialog"
        aria-labelledby="dialogTitle"
        aria-describedby="dialogDescription"
        className="bg-sky-100 w-96 h-64 rounded-lg border border-sky-500 -translate-y-44 flex flex-col gap-y-10 items-center justify-center p-4 relative "
      >
        <button
          onClick={() => setIsShowModal(false)}
          className="absolute right-3 top-2 "
          aria-label="بستن"
        >
          <svg
            className="size-6 fill-red-400"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <path d="M12 22C6.47715 22 2 17.5228 2 12C2 6.47715 6.47715 2 12 2C17.5228 2 22 6.47715 22 12C22 17.5228 17.5228 22 12 22ZM12 20C16.4183 20 20 16.4183 20 12C20 7.58172 16.4183 4 12 4C7.58172 4 4 7.58172 4 12C4 16.4183 7.58172 20 12 20ZM12 10.5858L14.8284 7.75736L16.2426 9.17157L13.4142 12L16.2426 14.8284L14.8284 16.2426L12 13.4142L9.17157 16.2426L7.75736 14.8284L10.5858 12L7.75736 9.17157L9.17157 7.75736L12 10.5858Z"></path>
          </svg>
        </button>
        <h1 id="dialogTitle" className=" max-[280px]:text-base text-lg font-semibold">
          {messageContent}
        </h1>
        <div className="flex">
          <button
            onClick={confirmOnClick}
            className="bg-green-300 w-24 py-2 rounded-lg ml-2 max-[280px]:text-sm text-base"
            aria-label="تأیید"
          >
            بله
          </button>
          <button
            onClick={() => setIsShowModal(false)}
            className="bg-pink-300 w-24 py-2 rounded-lg mr-2  max-[280px]:text-sm text-base"
            aria-label="لغو"
          >
            خیر
          </button>
        </div>
      </div>
    </div>
  );
}
