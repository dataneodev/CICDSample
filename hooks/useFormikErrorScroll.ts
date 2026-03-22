import { FormikErrors } from "formik";
import { isEmpty } from "lodash";
import { useEffect } from "react";
import scrollIntoView from "scroll-into-view-if-needed";

const useScrollToError = <T>(isSubmitting: boolean, errors: FormikErrors<T>) => {
  useEffect(() => {
    if (!isSubmitting) {
      return;
    }

    if (Object.values(errors).some((s) => !isEmpty(s))) {
      const pair = Object.entries(errors).find((f) => !isEmpty(f[1]))?.[0];
      if (!pair) {
        return;
      }

      const objArray = document.getElementsByName(pair);
      const inputs = [...objArray].filter((f) => f.nodeName === "INPUT" || f.nodeName === "TEXTAREA");

      if (inputs.length > 1) {
        console.error(`useFormikErrorScroll - More than one element with the same name:  ${objArray.length}`);

        return;
      }

      const obj = inputs[0];
      if (!obj) {
        return;
      }

      scrollIntoView(obj, { behavior: "smooth", block: "nearest" });
      obj.focus();
    }
  }, [errors, isSubmitting]);
};

export default useScrollToError;
