import { useMemo } from "react";
import { useLocation } from "react-router-dom";

export const useQueryParams = () => {
  const { search } = useLocation();

  return useMemo(() => {
    const params = {};
    new URLSearchParams(search).forEach((v, k) => {
      const value = v.includes(",") ? v.split(",") : v;

      return Object.assign(params, { [k]: value });
    });

    return params;
  }, [search]);
};
