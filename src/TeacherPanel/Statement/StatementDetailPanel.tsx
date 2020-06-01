import React, { useEffect, useState } from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { of, Task } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import {
  createStyles,
  makeStyles,
  Theme,
  CircularProgress,
  Typography,
} from '@material-ui/core';
import HttpService from '../../HttpService';
import { run } from '../../Utils/fp-ts/task';
import {
  TLessonResultAnswers,
  LessonResultAnswers,
  TableLessonResult,
} from './LessonResult';

interface Props {
  group: string;
  lesson: number;
  lessonResult: TableLessonResult;
}

const useStyles = makeStyles(({ spacing }: Theme) =>
  createStyles({
    root: {
      padding: `${spacing(1)}px ${spacing(3)}px`,
    },
  }),
);

function StatementDetailPanel({
  group,
  lesson,
  lessonResult,
}: Props): JSX.Element {
  useEffect((): void => {
    load();
  }, []);

  const [lessonResultAnswers, setLessonResultAnswers] = useState<
    LessonResultAnswers
  >();

  async function load(): Promise<void> {
    setLessonResultAnswers(
      await run(fetchLessonResults(lessonResult.resultId)),
    );
  }

  function fetchLessonResults(id: number): Task<LessonResultAnswers> {
    return pipe(
      HttpService.get(
        `/teacher-panel/group/${group}/lesson/${lesson}/result/${id}/`,
        TLessonResultAnswers,
      ),
      fold(
        err => {
          throw err;
        },
        lessonResults_ => of(lessonResults_),
      ),
    );
  }

  const classes = useStyles();

  if (typeof lessonResultAnswers === 'undefined') {
    return <CircularProgress />;
  }

  return (
    <div className={classes.root}>
      <Typography>Serial number: {lessonResult.n}</Typography>
      <Typography>Grade: {lessonResult.grade}</Typography>
      <Typography>{lessonResult.points} points</Typography>
      {lessonResultAnswers.taskResults.map((answer, index) => {
        const number = index + 1;
        return (
          <Typography>
            Task {number}: {answer.points}/{answer.maxPoints} points
          </Typography>
        );
      })}
    </div>
  );
}

export default StatementDetailPanel;
