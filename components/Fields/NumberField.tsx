import React from 'react';
import { TextFieldProps } from '@material-ui/core/TextField';
import RegexTextField from './RegexTextField';

type NumberFieldProps = TextFieldProps;
// type NumberFieldProps = Omit<TextFieldProps, 'regex'>;

export const numberRegex = /^-?[0-9]*$/;

function NumberField(props: NumberFieldProps): JSX.Element {
  return <RegexTextField regex={numberRegex} {...props} />;
}

export default NumberField;
