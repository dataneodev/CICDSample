import { changeNoSavedChangesState, incrementFailedCounter } from "app/block-navigate/action";
import { ComponentStateType } from "app/block-navigate/reducer";
import { useCallback, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "./redux";

const useNoSavedChangesWarning = (showWarning?: boolean, onAccept?: () => void, onReject?: () => void) => {
  const noSavedChanges = useAppSelector((state) => state.block_navigate_state.noSavedChanges);
  const componentState = useAppSelector((state) => state.block_navigate_state.componentState);

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (showWarning) {
      dispatch(changeNoSavedChangesState(true));
    } else {
      dispatch(changeNoSavedChangesState(false));
    }
  }, [dispatch, showWarning]);

  const tryNavigate = useCallback(
    (action?: () => void) => {
      if (noSavedChanges) {
        dispatch(incrementFailedCounter());
        return;
      }
      dispatch(changeNoSavedChangesState(false));
      action?.();
    },
    [dispatch, noSavedChanges]
  );

  useEffect(() => {
    if (componentState === ComponentStateType.default) {
      return;
    }

    if (componentState === ComponentStateType.accepted) {
      onAccept?.();
    }

    if (componentState === ComponentStateType.rejected) {
      onReject?.();
    }

    dispatch(changeNoSavedChangesState(false));
  }, [componentState, dispatch, onAccept, onReject]);

  return {
    noSavedChanges,
    tryNavigate,
  };
};

export default useNoSavedChangesWarning;
