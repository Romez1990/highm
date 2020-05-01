import React, { Fragment } from 'react';
import { Field } from 'formik';
// eslint-disable-next-line import/no-extraneous-dependencies
import { RadioGroup } from 'material-ui-formik-components/RadioGroup';
import MatrixInputs from '../../../../../Math/MatrixInputs';
import { AnswerProps } from '../../../../Answer';

function Answer1({ name }: AnswerProps): JSX.Element {
  return (
    <Fragment>
      <Field
        name={`${name}.whichOfProducts`}
        component={RadioGroup}
        options={[
          {
            label: 'AB',
            value: 'AB',
          },
          {
            label: 'BA',
            value: 'BA',
          },
        ]}
      />
      <Field name={`${name}.product`} component={MatrixInputs} />
    </Fragment>
  );
}

export default Answer1;
