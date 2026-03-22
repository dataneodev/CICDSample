import type { AppDispatch, RootState } from "app/store";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { SelectEffect, select } from "redux-saga/effects";

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export function selectState<T>(selector: (s: RootState) => T): SelectEffect {
  return select(selector);
}
