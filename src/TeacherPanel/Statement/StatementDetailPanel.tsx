import React, { Fragment } from 'react';
import { Typography } from '@material-ui/core';
import { TableLessonResult } from './LessonResult';

interface Props {
  lessonResult: TableLessonResult;
}

function StatementDetailPanel({ lessonResult }: Props): JSX.Element {
  return (
    <Fragment>
      <Typography>Serial number: {lessonResult.n}</Typography>
      <Typography>Grade: {lessonResult.grade}</Typography>
      <Typography>{lessonResult.points} points</Typography>
    </Fragment>
  );
}

export default StatementDetailPanel;
