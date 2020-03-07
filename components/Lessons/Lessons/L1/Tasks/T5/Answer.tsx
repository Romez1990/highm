import React from 'react';
import { Field } from 'formik';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { NumberField } from '../../../../../FormikMaterialUI';
import Formula from '../../../../../Math/Formula';
import { AnswerProps } from '../../../../../../src/Lesson';

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

function Answer5({ name }: AnswerProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Field
        name={`${name}.x1`}
        className={classes.field}
        component={NumberField}
        variant="outlined"
        size="small"
        label={<Formula>x_1</Formula>}
      />
      <Field
        name={`${name}.x2`}
        className={classes.field}
        component={NumberField}
        variant="outlined"
        size="small"
        label={<Formula>x_2</Formula>}
      />
    </div>
  );
}

export default Answer5;
