import React from 'react';
import { Field } from 'formik';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { AnswerProps } from '../../../../Answer';
import { FloatField } from '../../../../../FormikMaterialUI';
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
    note: {
      marginTop: spacing(1),
    },
  }),
);

function Answer1({ name }: AnswerProps): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Field
        name={`${name}.x`}
        className={classes.field}
        component={FloatField}
        variant="outlined"
        size="small"
        label={<Formula>x</Formula>}
      />
      <Typography className={classes.note} variant="body2">
        ответ указать с точностью 6-ти знаков после запятой
      </Typography>
    </div>
  );
}

export default Answer1;
