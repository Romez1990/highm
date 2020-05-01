import React from 'react';
import { getIn, FormikProps, FormikValues, FieldProps } from 'formik';
import {
  RadioGroup,
  Radio,
  FormControl,
  FormControlLabel,
  FormLabel,
  FormHelperText,
} from '@material-ui/core';

export interface FRadioGroupProps {
  label?: string;
  field: FieldProps;
  form: FormikProps<FormikValues>;
  options: Array<RadioGroupOptionsType>;
  required?: boolean;
  fullWidth?: boolean;
  margin?: 'none' | 'dense' | 'normal';
  classes?: FRadioClasses;
}

export interface RadioGroupOptionsType {
  label: string;
  value: string;
}

export interface FRadioClasses {
  formControl?: object;
  formLabel?: object;
  radioGroup?: object;
  formControlLabel?: object;
  radio?: object;
  formHelperText?: object;
}

function FRadioGroup({
  label,
  field,
  form: { touched, errors, setFieldValue },
  options,
  required,
  fullWidth,
  margin,
  classes: {
    formControl,
    formLabel,
    radioGroup,
    formControlLabel,
    radio,
    formHelperText,
  },
  ...props
}: FRadioGroupProps): JSX.Element {
  const errorText = getIn(errors, field.name);
  const touchedVal = getIn(touched, field.name);
  const hasError = touchedVal && errorText !== undefined;
  return (
    <FormControl
      component="fieldset"
      fullWidth={fullWidth}
      margin={margin}
      required={required}
      error={hasError}
      className={formControl}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...props}
    >
      <FormLabel className={formLabel}>{label}</FormLabel>
      <RadioGroup
        aria-label={label}
        name={field.name}
        value={field.value}
        onChange={(event): void =>
          setFieldValue(field.name, event.target.value)
        }
        className={radioGroup}
      >
        {options.map(item => (
          <FormControlLabel
            key={`${item.label}_${item.value}`}
            value={item.value}
            control={<Radio className={radio} />}
            label={item.label}
            className={formControlLabel}
          />
        ))}
      </RadioGroup>
      {hasError && (
        <FormHelperText className={formHelperText}>{errorText}</FormHelperText>
      )}
    </FormControl>
  );
}

export default FRadioGroup;
