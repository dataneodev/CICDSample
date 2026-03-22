import { RootState } from "app/store";
import { useEffect } from "react";
import { useStateWatcher, useStateWatcherFn } from "./useStateWatcher";

/**
 * Listens on redux state changes and calls action when both values match
 * @param selector Redux state selector
 * @param previousValueMatch value to match in previous state
 * @param currentValueMatch value to match in current state
 * @param action action to run when states match
 */
export const useStateEffect = <T>(
  selector: (state: RootState) => T,
  previousValueMatch: T,
  currentValueMatch: T,
  action: () => void
) => {
  const matched = useStateWatcher(selector, previousValueMatch, currentValueMatch);
  useEffect(() => {
    matched && typeof action === "function" && action();
  }, [matched, action]);

  return null;
};

/**
 * Listens on redux state changes and calls action when both values match
 * @param selector Redux state selector
 * @param previousValueMatch value to match in previous state
 * @param currentValueMatch value to match in current state
 * @param action action to run when states match
 */
export const useStateEffectFn = <T>(
  selector: (state: RootState) => T,
  previousValueMatch: (value: T) => boolean,
  currentValueMatch: (value: T) => boolean,
  action: () => void
) => {
  const matched = useStateWatcherFn(selector, previousValueMatch, currentValueMatch);
  useEffect(() => {
    matched && typeof action === "function" && action();
  }, [matched, action]);

  return null;
};
