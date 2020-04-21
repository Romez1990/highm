import { useState, ChangeEvent } from 'react';

function useRegexValidation(
  onChange:
    | ((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void)
    | undefined,
  regex: RegExp,
): (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void {
  const [previousValue, setPreviousValue] = useState('');

  return (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>): void => {
    const { value } = e.target;
    if (!regex.test(value)) {
      e.target.value = previousValue;
      return;
    }
    setPreviousValue(value);
    if (typeof onChange === 'undefined') return;
    onChange(e);
  };
}

export default useRegexValidation;
