/* eslint-disable react-hooks/exhaustive-deps */
import { isEqual } from "lodash";
import { useEffect, useState } from "react";
import { useDebounceChangeTracker } from "./useDebounceChangeTracker";

interface useDebounceInputOptions {
  debounceTime?: number;
}

const defaultOptions: useDebounceInputOptions = {
  debounceTime: 500,
};

const useDebounceInput = <T>(value: T, callback: (value: T) => void, options?: useDebounceInputOptions) => {
  const [debouncedValue, setDebounceValue] = useState(value);
  const _options = options ?? defaultOptions;

  const { isTracking, handleStartTracking, handleStopTracking } = useDebounceChangeTracker();

  useEffect(() => {
    setDebounceValue(value);
  }, [value]);

  useEffect(() => {
    if (isEqual(value, debouncedValue)) {
      return;
    }
    const handler = setTimeout(() => {
      callback(debouncedValue);
      handleStopTracking();
    }, _options.debounceTime);

    return () => clearTimeout(handler);
  }, [_options.debounceTime, debouncedValue]);

  const changeDebouncedValue = (value: T) => {
    if (!isTracking) {
      handleStartTracking();
    }
    setDebounceValue(value);
  };

  return {
    debouncedValue,
    changeDebouncedValue,
  };
};

export default useDebounceInput;
