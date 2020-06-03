import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import Formula from '../../../../../Math/Formula';
import { TaskProps } from '../../../../Task';
import { Task1Type } from './TaskType';

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    task: {
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      marginTop: spacing(1.5),
    },
    span: {
      margin: spacing(0, 1.5),
    },
  }),
);

function Task1({ children }: TaskProps): JSX.Element {
  const task = children as Task1Type;

  const segment = `[${task.a},${task.b}]`;

  const epsilon = String.raw`\epsilon = ${task.epsilon}`;

  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Formula>{task.equation}</Formula>
      <span className={classes.span}>на отрезке</span>
      <Formula>{segment}</Formula>
      <span className={classes.span}>с погрешностью</span>
      <Formula>{epsilon}</Formula>
    </div>
  );
}

export default Task1;
