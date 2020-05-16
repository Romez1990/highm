import React from 'react';
import { numberRegex } from '../Fields';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

export declare type NumberFieldProps = Omit<RegexTextFieldProps, 'regex'>;

function NumberField({ ...props }: NumberFieldProps): JSX.Element {
  return <RegexTextField regex={numberRegex} {...props} />;
}

export default NumberField;
