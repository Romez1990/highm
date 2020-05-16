import React from 'react';
import { Field } from 'formik';
import MatrixInputs from '../../../../../Math/MatrixInputs';
import { AnswerProps } from '../../../../Answer';

function Answer4({ name }: AnswerProps): JSX.Element {
  return <Field name={`${name}.result`} component={MatrixInputs} />;
}

export default Answer4;
