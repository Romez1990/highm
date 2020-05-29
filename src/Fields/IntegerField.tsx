import React from 'react';
import RegexTextField, { RegexTextFieldProps } from './RegexTextField';

type IntegerFieldProps = Omit<RegexTextFieldProps, 'regex'>;

export const integerRegex = /^-?\d*$/;

function IntegerField(props: IntegerFieldProps): JSX.Element {
  return <RegexTextField regex={integerRegex} {...props} />;
}

export default IntegerField;
