import { RouteType } from "app/routing/types";
import { createAppPath } from "app/routing/utils";
import { useNavigate } from "react-router-dom";

export const useAppNavigate = () => {
  const navigate = useNavigate();

  return (to: RouteType, ...params: (string | number)[]) => navigate(createAppPath(to, ...params));
};
