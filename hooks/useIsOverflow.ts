import { RefObject, useEffect, useState } from "react";

const useIsOverflow = (ref: RefObject<HTMLElement>, trigger?: unknown) => {
  const [isOverflow, setIsOverflow] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const element = ref.current;
      if (!element) {
        return;
      }
      setIsOverflow(element.scrollWidth > element.clientWidth);
    };

    const handleResize = () => {
      checkOverflow();
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [ref, trigger]);

  return {
    isOverflow,
  };
};

export default useIsOverflow;
