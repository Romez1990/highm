import React from 'react';
import { Field } from 'formik';
import { NumberField } from '../../../../../FormikMaterialUI';
import { AnswerProps } from '../../../../../../src/Lesson';

function Answer6({ name }: AnswerProps): JSX.Element {
  return (
    <Field
      name={`${name}.determinant`}
      component={NumberField}
      variant="outlined"
      size="small"
      label="Определитель"
    />
  );
}

export default Answer6;
