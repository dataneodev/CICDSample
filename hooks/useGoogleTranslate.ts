import Api from "api/api";
import { notify } from "app/components/Notifier/actions";
import { NotificationType } from "app/components/Notifier/constants";
import { useAppDispatch } from "./redux";
import useApiCallWithRequest from "./useApiCallWithRequest";

export const useGoogleTranslate = (onTranslateSuccess: (translation: TranslationResult | null) => void) => {
  const dispatch = useAppDispatch();
  const { loading: translateLoading, refresh } = useApiCallWithRequest(
    (request: string) => Api.Translate.TranslateText(request),
    {
      onSuccess: (data) => onTranslateSuccess(data.data),
      onError: (error) => dispatch(notify(NotificationType.Error, error)),
    }
  );

  const translate = (text: string | null) => {
    if (!text) {
      return onTranslateSuccess(null);
    }
    refresh(text);
  };

  return { translateLoading, translate };
};

export type TranslationResult = Record<string, string>;

export enum TranslationResultKey {
  English = "en",
  German = "de",
}
