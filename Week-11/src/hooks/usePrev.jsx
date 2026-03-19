import { useEffect, useRef } from "react";

export const usePrev = (value) => {
  const ref = useRef(undefined);

  useEffect(() => {
    ref.current = value;
  }, [value]);

  // eslint-disable-next-line react-hooks/refs
  return ref.current;
};

//React property: returns first, effect gets called later
