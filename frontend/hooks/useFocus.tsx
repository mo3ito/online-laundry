import { MutableRefObject, useEffect } from "react";

const useFocus = (nameRef: MutableRefObject<HTMLInputElement | null>) => {
  useEffect(() => {
    nameRef.current?.focus();
  }, []);
};

export default useFocus;
