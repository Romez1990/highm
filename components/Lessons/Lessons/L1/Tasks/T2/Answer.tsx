import React, { Fragment } from 'react';
import { Field } from 'formik';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { NumberField } from '../../../../../FormikMaterialUI';
import MatrixInputs from '../../../../../Math/MatrixInputs';
import { AnswerProps } from '../../../../../../src/Lesson';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    traceField: {
      marginTop: spacing(2),
    },
  }),
);

function Answer2({ name }: AnswerProps): JSX.Element {
  const classes = useStyles();

  return (
    <Fragment>
      <Field name={`${name}.product`} component={MatrixInputs} />
      <Field
        name={`${name}.trace`}
        className={classes.traceField}
        component={NumberField}
        variant="outlined"
        size="small"
        label="След"
      />
    </Fragment>
  );
}

export default Answer2;
