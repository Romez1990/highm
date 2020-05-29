import React from 'react';
import { floatRegex } from '../Fields';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

export declare type FloatFieldProps = Omit<RegexTextFieldProps, 'regex'>;

function FloatField({ ...props }: FloatFieldProps): JSX.Element {
  return <RegexTextField regex={floatRegex} {...props} />;
}

export default FloatField;
