import React from 'react';
import { integerRegex } from '../Fields';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

export declare type IntegerFieldProps = Omit<RegexTextFieldProps, 'regex'>;

function IntegerField({ ...props }: IntegerFieldProps): JSX.Element {
  return <RegexTextField regex={integerRegex} {...props} />;
}

export default IntegerField;
