import React, { Fragment, useEffect, useState } from 'react';
import dynamic from 'next/dynamic';
import { pipe } from 'fp-ts/lib/pipeable';
import { of, Task } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { CircularProgress, Typography } from '@material-ui/core';
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
        `/teacher-panel/group/${group}/lesson/${lesson}/statement/${id}/`,
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

  const LessonAnswer = dynamic(() =>
    import(`../../Lesson/Lessons/L${lesson}/LessonAnswerDisplay`),
  );

  if (typeof lessonResultAnswers === 'undefined') {
    return <CircularProgress />;
  }
  return (
    <Fragment>
      <Typography>Serial number: {lessonResult.n}</Typography>
      <Typography>Grade: {lessonResult.grade}</Typography>
      <Typography>{lessonResult.points} points</Typography>
      <LessonAnswer />
    </Fragment>
  );
}

export default StatementDetailPanel;
