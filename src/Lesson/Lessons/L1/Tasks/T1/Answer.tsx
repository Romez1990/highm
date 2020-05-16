import React, { Fragment } from 'react';
import { Field } from 'formik';
import { FormControlLabel, Radio } from '@material-ui/core';
import { RadioGroup } from 'formik-material-ui';
import MatrixInputs from '../../../../../Math/MatrixInputs';
import { AnswerProps } from '../../../../Answer';

function Answer1({ name }: AnswerProps): JSX.Element {
  return (
    <Fragment>
      <Field name={`${name}.whichOfProducts`} component={RadioGroup}>
        <FormControlLabel
          value="AB"
          control={<Radio color="primary" />}
          label="AB"
        />
        <FormControlLabel
          value="BA"
          control={<Radio color="primary" />}
          label="BA"
        />
      </Field>
      <Field name={`${name}.product`} component={MatrixInputs} />
    </Fragment>
  );
}

export default Answer1;
