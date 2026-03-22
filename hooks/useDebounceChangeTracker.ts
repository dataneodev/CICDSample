import { useAppDispatch, useAppSelector } from "hooks/redux";
import { startTextInputTracking, stopTextInputTracking } from "../modules/TextInput/actions";

export const useDebounceChangeTracker = () => {
  const isTracking = useAppSelector((state) => state.text_input_tracking.isTracking);

  const dispatch = useAppDispatch();

  const handleStartTracking = () => dispatch(startTextInputTracking());
  const handleStopTracking = () => dispatch(stopTextInputTracking());

  return { isTracking, handleStartTracking, handleStopTracking };
};
