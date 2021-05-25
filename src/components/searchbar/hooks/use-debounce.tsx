import React, { useState } from 'react';
import { FETCH_POLICY } from '../../../config/ui.config';

function useDebounce(
  value: string,
  delay: number = FETCH_POLICY.DEBOUNCE_DELAY
) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  React.useEffect(() => {
    const handler: NodeJS.Timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export default useDebounce;
