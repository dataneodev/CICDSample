import { FetchResult } from "api/types";
import { ExistenceState } from "modules/ValueExistenceChecker/types";
import { useState } from "react";

interface valueExistingCheckerProps<T> {
  errorMessage: string;
  changeError?: (error: string | undefined) => void;
  apiCall: (value: T) => Promise<FetchResult<boolean>>;
  changeValue: (value: T) => void;
}

export const useValueExistingChecker = <T>(props: valueExistingCheckerProps<T>) => {
  const { errorMessage, apiCall, changeError, changeValue } = props;

  const [checkingState, setCheckingState] = useState<ExistenceState>(ExistenceState.Default);

  const check = async (value: T) => {
    setCheckingState(ExistenceState.Checking);
    changeError?.(undefined);

    const { data, error } = await apiCall(value);
    if (data) {
      setCheckingState(ExistenceState.Used);
      changeError?.(errorMessage);
    } else {
      setCheckingState(ExistenceState.Unused);
    }
    if (error) {
      setCheckingState(ExistenceState.Default);
    }
    changeValue(value);
  };
  return {
    checkingState,
    check,
  };
};
