"use client";
import { Dispatch, MutableRefObject, SetStateAction, useEffect } from "react";

const useDropDown = (
  refName: MutableRefObject<HTMLDivElement | HTMLElement | null>,
  stateName: boolean,
  setStateName: Dispatch<SetStateAction<boolean>>
) => {
  useEffect(() => {
    const dropDownHandler = (event: MouseEvent) => {
      if (
        refName &&
        refName.current &&
        stateName &&
        !refName.current.contains(event.target as Node)
      ) {
        setStateName(false);
      }
    };

    document.body.addEventListener("click", dropDownHandler);

    return () => document.body.removeEventListener("click", dropDownHandler);
  }, [stateName]);
};

export default useDropDown;
