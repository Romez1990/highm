import React from 'react';
import { Field } from 'formik';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { FloatField } from '../../../../../FormikMaterialUI';
import IntermediateResultsTable from '../IntermediateResultsTable';
import { AnswerProps } from '../../../../Answer';

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

function Answer1({ name }: AnswerProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Field
        name={`${name}.intermediateResults`}
        component={IntermediateResultsTable}
      />
      <Field
        name={`${name}.result`}
        className={classes.field}
        component={FloatField}
        variant="outlined"
        size="small"
        label="Результат"
      />
    </div>
  );
}

export default Answer1;
