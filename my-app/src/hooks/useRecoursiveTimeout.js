import { useEffect, useRef } from "react";

function useRecursiveTimeout(callback, delay) {
  const savedCallback = useRef(callback);

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    let timeoutId;
    function tick() {
      const result = savedCallback.current();

      if (result instanceof Promise) {
        result.then(() => {
          if (delay !== null) {
            timeoutId = setTimeout(tick, delay);
          }
        });
      } else {
        if (delay !== null) {
          timeoutId = setTimeout(tick, delay);
        }
      }
    }
    if (delay !== null) {
      timeoutId = setTimeout(tick, delay);
      return () => timeoutId && clearTimeout(timeoutId);
    }
  }, [delay]);
}

export default useRecursiveTimeout;