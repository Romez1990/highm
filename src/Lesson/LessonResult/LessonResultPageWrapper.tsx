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
import { TLessonResults, LessonResults } from '../Lesson';

interface Props {
  number: number;
  lessonResults?: LessonResults;
}

LessonResultPageWrapper.permission = 'IsStudent' as Permission;

LessonResultPageWrapper.getInitialProps = async ({
  req,
  res,
  query,
}: NextPageContext): Promise<Props> => {
  const number = getNumber(query);
  const lessonResults = await fetchLessonResults(req, res, number)();
  return {
    number,
    lessonResults,
  };
};

function getNumber(query: ParsedUrlQuery): number {
  const { number } = query;
  if (typeof number !== 'string') throw new Error('Param must be string');
  return parseInt(number, 10);
}

function fetchLessonResults(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
  number: number,
): Task<LessonResults | undefined> {
  return pipe(
    HttpService.get(`/lesson/${number}/results/`, TLessonResults, req),
    fold(
      err => {
        throw err;
      },
      lesson => of(lesson),
    ),
  );
}

function LessonResultPageWrapper({
  number,
  lessonResults,
}: Props): JSX.Element {
  if (typeof lessonResults === 'undefined')
    throw new Error('Must be redirected to lesson');

  return (
    <MainLayout title={`Lesson ${number} results`}>
      <LessonResultPage number={number} lessonResults={lessonResults} />
    </MainLayout>
  );
}

export default LessonResultPageWrapper;
