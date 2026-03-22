import { DependencyList, useMemo } from "react";
import { usePrevious } from "./usePrevious";

export const usePreviousMemo = <T>(factory: () => T, deps: DependencyList | undefined) => {
  const current = useMemo(factory, [deps, factory]);
  const previous = usePrevious(current);

  return { previous, current };
};
