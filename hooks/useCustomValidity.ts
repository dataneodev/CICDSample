import { useDeferredValue, useEffect } from "react";

const useCustomValidity = (elementId: string, validate: () => string | null | false | undefined) => {
  const id = useDeferredValue(elementId);
  const func = useDeferredValue(validate);

  useEffect(() => {
    const element = document.getElementById(id) as HTMLFieldSetElement;
    if (!element?.setCustomValidity) {
      return;
    }

    element.setCustomValidity("");

    const error = func();
    if (error) {
      element.setCustomValidity(error);
    }
  }, [id, func]);
};

export default useCustomValidity;
