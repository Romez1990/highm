import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { TableLessonResult } from './LessonResult';

interface Props {
  lessonResult: TableLessonResult;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing(1)}px ${spacing(3)}px`,
    },
  }),
);

function StatementDetailPanel({ lessonResult }: Props): JSX.Element {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Typography>Serial number: {lessonResult.n}</Typography>
      <Typography>Grade: {lessonResult.grade}</Typography>
      <Typography>{lessonResult.points} points</Typography>
    </div>
  );
}

export default StatementDetailPanel;
