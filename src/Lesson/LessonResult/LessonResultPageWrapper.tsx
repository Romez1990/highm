import { ParsedUrlQuery } from 'querystring';
import { IncomingMessage, ServerResponse } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { MainLayout } from '../../Layout';
import LessonResultPage from './LessonResultPage';
import HttpService from '../../HttpService';
import { Permission } from '../../AuthenticationService';
import getLesson from '../getLesson';
import { TLessonResult, LessonResult } from '../Lesson';

interface Props {
  number: number;
  lessonResult?: LessonResult;
}

LessonResultPageWrapper.permission = 'IsStudent' as Permission;

LessonResultPageWrapper.getInitialProps = async ({
  req,
  res,
  query,
}: NextPageContext): Promise<Props> => {
  const number = getLesson(query);
  const lessonResult = await fetchLessonResult(req, res, number)();
  return {
    number,
    lessonResult,
  };
};

function fetchLessonResult(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
  number: number,
): Task<LessonResult | undefined> {
  return pipe(
    HttpService.get(`/lesson/${number}/result/`, TLessonResult, req),
    fold(
      err => {
        throw err;
      },
      lesson => of(lesson),
    ),
  );
}

function LessonResultPageWrapper({ number, lessonResult }: Props): JSX.Element {
  if (typeof lessonResult === 'undefined')
    throw new Error('Must be redirected to lesson');

  return (
    <MainLayout title={`Lesson ${number} result`}>
      <LessonResultPage number={number} lessonResult={lessonResult} />
    </MainLayout>
  );
}

export default LessonResultPageWrapper;
