import React, { Fragment } from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
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
      fontSize: '1.5em',
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

  const classes = useStyles();

  return (
    <Fragment>
      <div className={classes.task}>
        <Formula>{task.integral}</Formula>
      </div>
      <Typography className={classes.note} variant="body2">
        ответ указать с точностью {task.tolerance} знаков после запятой
      </Typography>
    </Fragment>
  );
}

export default Task1;
