import { SyntheticEvent, useState } from 'react';

export const useInput = (initialValue: any) => {
  const [value, setValue] = useState(initialValue);
  const [isFocused, setIsFocused] = useState(false);
  const [errors, setErrors] = useState<any[]>([]);

  return {
    value,
    setValue,
    isFocused,
    setIsFocused,
    reset: () => setValue(''),
    errors,
    setErrors,
    bind: {
      value,
      onChange: (e: SyntheticEvent) => {
        const target = e.target as HTMLInputElement;
        setValue(target.value);
      },
      onFocus: (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsFocused((isFocused) => !isFocused);
      },
      onBlur: (e: SyntheticEvent) => {
        e.stopPropagation();
        setIsFocused((isFocused) => !isFocused);
      }
    }
  };
};
