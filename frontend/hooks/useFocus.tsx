import { MutableRefObject, useEffect } from "react";

const useFocus = (nameRef: MutableRefObject<HTMLElement | null>) => {
  useEffect(() => {
    nameRef.current.focus();
  }, []);
};

export default useFocus;
