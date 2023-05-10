import React, {useCallback, useRef} from 'react';

// eslint-disable-next-line @typescript-eslint/ban-types
export function useThrottle(callback: Function, delay = 16) {
  const isThrottled = useRef<null | boolean>(null);

  return useCallback(
    (...args: any) => {
      if (isThrottled.current) {
        return;
      }
      callback(args);
      isThrottled.current = true;
      // eslint-disable-next-line no-return-assign
      setTimeout(() => (isThrottled.current = false), delay);
    },
    [callback, delay],
  );
}
