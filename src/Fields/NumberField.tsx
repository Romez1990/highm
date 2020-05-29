import React from 'react';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

type NumberFieldProps = Omit<RegexTextFieldProps, 'regex'>;

export const numberRegex = /^-?[0-9]*$/;

function NumberField(props: NumberFieldProps): JSX.Element {
  return <RegexTextField regex={numberRegex} {...props} />;
}

export default NumberField;
