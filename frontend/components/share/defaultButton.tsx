import React from "react";
import Link from "next/link";
import { Url } from "next/dist/shared/lib/router/router";

type DefaultButtonProps = {
  content: string;
  classNameContent?: string;
  className?: string;
  href?: Url;
  isLinkTag?: boolean;
  onClick?: () => void;
  isLoading?: boolean;
  disabled?:boolean;
  svgClassName?:string
};

export default function DefaultButton({
  content,
  className = "w-max",
  classNameContent,
  href,
  isLinkTag = false,
  onClick,
  isLoading = false,
  disabled = false,
  svgClassName = 'fill-zinc-500'
}: DefaultButtonProps) {
  return (
    <>
      {isLinkTag ? (
        <Link
          href={href as Url}
          className={`${className} bg-sky-200 group overflow-hidden  flex items-center justify-center text-center font-semibold  relative`}
        >
          <span className={classNameContent}>{content}</span>
        </Link>
      ) : (
        <button
        disabled={disabled}
          onClick={onClick}
          className={`${className} group overflow-hidden flex items-center justify-center text-center font-semibold  bg-sky-200   relative`}
        >
          {isLoading && (
            <svg
              className={`${svgClassName} translate-x-3 size-5 sm:size-6`}
              xmlns="http://www.w3.org/2000/svg"
              width="1em"
              height="1em"
              viewBox="0 0 24 24"
            >
              <path d="M12,23a9.63,9.63,0,0,1-8-9.5,9.51,9.51,0,0,1,6.79-9.1A1.66,1.66,0,0,0,12,2.81h0a1.67,1.67,0,0,0-1.94-1.64A11,11,0,0,0,12,23Z">
                <animateTransform
                  attributeName="transform"
                  dur="0.75s"
                  repeatCount="indefinite"
                  type="rotate"
                  values="0 12 12;360 12 12"
                />
              </path>
            </svg>
          )}
          <span className={classNameContent}>{content}</span>
        </button>
      )}
    </>
  );
}
