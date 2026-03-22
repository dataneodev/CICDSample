import { RootState } from "app/store";
import { useAppSelector } from "./redux";
import { usePrevious } from "./usePrevious";

export const usePreviousState = <T>(selector: (state: RootState) => T) => {
  const current = useAppSelector(selector);
  const previous = usePrevious(current);

  return { previous, current };
};
