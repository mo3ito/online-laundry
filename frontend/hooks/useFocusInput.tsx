import { RefObject, useEffect } from "react";

const useFocusInput = (inputRef: RefObject<HTMLInputElement>) => {
  useEffect(() => {
    if (inputRef && inputRef.current) {
      inputRef.current.focus();
    }
  }, []);
};

export default useFocusInput;
