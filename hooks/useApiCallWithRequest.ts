import { useFirstRender } from "@mui/x-data-grid-pro";
import { FetchResult } from "api/types";
import { isEqual, isNil } from "lodash";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";

interface useApiFetchOptions<T, R> {
  fetchOnMount?: boolean;
  initialRequest?: R | object | null | undefined;
  onSuccess?: (data: T, request: R) => void;
  onNoData?: () => void;
  onError?: (error: string) => void;
}

const defaultOptions: useApiFetchOptions<unknown, unknown> = {
  onSuccess: undefined,
  onError: undefined,
  fetchOnMount: false,
  initialRequest: undefined,
};

const useApiCallWithRequest = <T, R>(
  action: (request: R) => Promise<FetchResult<T>>,
  options?: useApiFetchOptions<T, R>
) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null | undefined>(null);

  const prevRequestRef = useRef<R | object | null | undefined>(options?.initialRequest ?? undefined);

  const _options: useApiFetchOptions<T, R> = useMemo(
    () => ({
      ...(defaultOptions as useApiFetchOptions<T, R>),
      ...options,
    }),
    [options]
  );

  const fetch = useCallback(
    async (request: R) => {
      try {
        setLoading(true);
        setError(null);
        setData(null);

        const { data, error } = await action(request);
        if (error) {
          const e = error ?? "Wystąpił błąd podczas komunikacji z serwerem";
          setError(e);
          _options.onError?.(e);

          return;
        }

        setData(data);

        if (!data) {
          _options.onNoData?.();

          return;
        }

        _options.onSuccess?.(data, request);
      } finally {
        setLoading(false);
      }
    },
    [action, _options]
  );

  useFirstRender(() => {
    if (_options.fetchOnMount && !isNil(_options.initialRequest)) {
      fetch(_options.initialRequest as R);
    } else if (isNil(_options.initialRequest)) {
      _options.onNoData?.();
    }
  });

  useEffect(() => {
    const currentRequest = _options.initialRequest;

    if (isNil(currentRequest)) {
      if (!isNil(prevRequestRef.current)) {
        _options.onNoData?.();
        prevRequestRef.current = currentRequest;
      }
      return;
    }

    if (!isEqual(prevRequestRef.current, currentRequest)) {
      fetch(currentRequest as R);
      prevRequestRef.current = currentRequest;
    }
  }, [_options.initialRequest, fetch, _options]);

  return {
    data,
    error,
    loading,
    refresh: fetch,
  };
};

export default useApiCallWithRequest;
