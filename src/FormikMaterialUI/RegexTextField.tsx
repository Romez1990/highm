import React, { ChangeEvent } from 'react';
import {
  TextField as FormikTextField,
  TextFieldProps as FormikTextFieldProps,
} from 'formik-material-ui';
import { useRegexValidation } from '../RegexTextField';

export declare type RegexTextFieldProps = FormikTextFieldProps & {
  regex: RegExp;
};

function RegexTextField({
  regex,
  onChange,
  ...props
}: RegexTextFieldProps): JSX.Element {
  // eslint-disable-next-line react/destructuring-assignment
  const formikChange = useRegexValidation(props.field.onChange, regex);

  // eslint-disable-next-line react/destructuring-assignment,no-param-reassign
  props.field.onChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    formikChange(e);
    if (typeof onChange !== 'undefined') onChange(e);
  };

  return <FormikTextField {...props} />;
}

export default RegexTextField;
