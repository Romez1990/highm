import React from 'react';
import { Field } from 'formik';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { AnswerProps } from '../../../../../../src/Lesson';
import { NumberField } from '../../../../../FormikMaterialUI';
import Formula from '../../../../../Math/Formula';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'start',
    },
    field: {
      marginTop: spacing(2),
    },
  }),
);

function Answer2({ name }: AnswerProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Field
        name={`${name}.x`}
        className={classes.field}
        component={NumberField}
        variant="outlined"
        size="small"
        label={<Formula>x</Formula>}
      />
      <Field
        name={`${name}.y`}
        className={classes.field}
        component={NumberField}
        variant="outlined"
        size="small"
        label={<Formula>y</Formula>}
      />
      <Field
        name={`${name}.z`}
        className={classes.field}
        component={NumberField}
        variant="outlined"
        size="small"
        label={<Formula>z</Formula>}
      />
    </div>
  );
}

export default Answer2;
