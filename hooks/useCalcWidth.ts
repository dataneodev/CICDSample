import { RefObject, useEffect, useState } from "react";

export const useCalcWidth = (ref: RefObject<HTMLElement>, trigger: unknown) => {
  const [actualWidth, setActualWidth] = useState<number | null>();

  useEffect(() => {
    if (!ref.current) {
      return;
    }
    const handleResize = () => {
      if (ref.current) {
        setActualWidth(ref.current.offsetWidth);
      }
    };

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [trigger, ref.current?.clientWidth, ref]);

  return { actualWidth };
};
