import { RootState } from "app/store";
import { useMemo } from "react";
import { useAppSelector } from "./redux";
import { usePrevious } from "./usePrevious";

/**
 * Listens on redux state changes and returns boolean if both values match
 * @param selector Redux state selector
 * @param previousValueMatch value to match in previous state
 * @param currentValueMatch value to match in current state
 * @returns Boolean
 */

export const useStateWatcher = <T>(selector: (state: RootState) => T, previousValueMatch: T, currentValueMatch: T) => {
  const current = useAppSelector(selector);
  const previous = usePrevious(current);

  return useMemo(() => {
    return current === currentValueMatch && previous === previousValueMatch;
  }, [current, currentValueMatch, previous, previousValueMatch]);
};

export const useStateWatcherFn = <T>(
  selector: (state: RootState) => T,
  previousValueMatch: (value: T) => boolean,
  currentValueMatch: (value: T) => boolean
) => {
  const current = useAppSelector(selector);
  const previous = usePrevious(current);

  return useMemo(() => {
    return currentValueMatch(current) && previousValueMatch(previous);
  }, [current, currentValueMatch, previous, previousValueMatch]);
};
