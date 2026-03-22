import { useEffect, useState } from "react";

export interface WindowSizeProps {
  innerWidth: number;
  innerHeight: number;
}

const getWindowSize = (): WindowSizeProps => {
  const { innerWidth, innerHeight }: WindowSizeProps = window;

  return { innerWidth, innerHeight };
};

const useWindowResize = () => {
  const [windowSize, setWindowSize] = useState<WindowSizeProps>(getWindowSize());

  useEffect(() => {
    const handleWindowResize = () => setWindowSize(getWindowSize());

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  return { windowSize };
};

export default useWindowResize;
