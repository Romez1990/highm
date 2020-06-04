import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import Formula from '../../../../../Math/Formula';
import { TaskProps } from '../../../../Task';
import { Task1Type } from './TaskType';

const useStyles = makeStyles(({ spacing, typography: { pxToRem } }: Theme) =>
  createStyles({
    task: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing(1.5),
      fontSize: pxToRem(16),
    },
    span: {
      margin: spacing(0, 1.5),
    },
    note: {
      marginTop: spacing(2),
    },
  }),
);

function Task1({ children }: TaskProps): JSX.Element {
  const task = children as Task1Type;

  const segment = `[${task.a},${task.b}]`;

  const epsilon = String.raw`\epsilon = ${task.epsilon}`;

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.task}>
        <Formula>{task.equation}</Formula>
        <Typography className={classes.span}>на отрезке</Typography>
        <Formula>{segment}</Formula>
        <Typography className={classes.span}>с погрешностью</Typography>
        <Formula>{epsilon}</Formula>
      </div>
      <Typography className={classes.note} variant="body2">
        ответ указать с точностью {task.tolerance} знаков после запятой
      </Typography>
    </Fragment>
  );
}

export default Task1;
