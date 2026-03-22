import { isEqual } from "lodash";
import { useEffect } from "react";
import { usePrevious } from "./usePrevious";

export const useChangeEffect = <T>(current: T, action: (current: T, previous: T) => void) => {
  const previous = usePrevious(current);

  useEffect(() => {
    if (isEqual(current, previous)) {
      return;
    }
    if (!previous) {
      return;
    }
    action(current, previous);
  }, [current, previous, action]);

  return null;
};
