import { useFirstRender } from "@mui/x-data-grid";
import { FetchResult } from "api/types";
import { useCallback, useMemo, useState } from "react";

interface useApiFetchOptions<T> {
  fetchOnMount?: boolean;
  onLoading?: (loading: boolean) => void;
  onSuccess?: (data: T) => void;
  onNoData?: () => void;
  onError?: (error: string) => void;
}

const defaultOptions: useApiFetchOptions<unknown> = {
  fetchOnMount: false,
  onSuccess: undefined,
  onError: undefined,
};

const useApiCall = <T>(action: () => Promise<FetchResult<T>>, options?: useApiFetchOptions<T>) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [data, setData] = useState<T | null | undefined>(null);

  const _options = useMemo(
    () => ({
      ...defaultOptions,
      ...options,
    }),
    [options]
  );

  const fetch = useCallback(async () => {
    try {
      _options.onLoading?.(true);
      setLoading(true);
      setError(null);
      setData(null);

      const { data, error } = await action();
      _options.onLoading?.(false);

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

      _options.onSuccess?.(data);
    } finally {
      setLoading(false);
    }
  }, [action, _options]);

  useFirstRender(() => _options.fetchOnMount && fetch());

  return {
    data,
    error,
    loading,
    refresh: fetch,
  };
};

export default useApiCall;
