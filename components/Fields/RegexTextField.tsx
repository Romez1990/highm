import React from 'react';
import MuiTextField, {
  TextFieldProps as MuiTextFieldProps,
} from '@material-ui/core/TextField';
import { useRegexValidation } from '../../src/RegexTextField';

export declare type RegexTextFieldProps = MuiTextFieldProps & {
  regex: RegExp;
};

function RegexTextField({
  regex,
  onChange,
  ...props
}: RegexTextFieldProps): JSX.Element {
  const change = useRegexValidation(onChange, regex);

  return <MuiTextField onChange={change} {...props} />;
}

export default RegexTextField;
