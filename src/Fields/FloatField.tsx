import React from 'react';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

type FloatFieldProps = Omit<RegexTextFieldProps, 'regex'>;

export const floatRegex = /^-?(?:\d+|\d+\.\d*)?$/;

function FloatField(props: FloatFieldProps): JSX.Element {
  return <RegexTextField regex={floatRegex} {...props} />;
}

export default FloatField;
