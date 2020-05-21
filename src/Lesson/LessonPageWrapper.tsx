import { IncomingMessage, ServerResponse } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService, { HttpError } from '../HttpService';
import { Permission } from '../AuthenticationService';
import { LessonBase } from './Lesson';
import { MainLayout } from '../Layout';
import LessonPage from './LessonPage';
import { TLessonTypeC, LessonPageData } from './LessonPageData';
import { LessonError } from './Errors';
import LessonPassedError from './Errors/LessonErrors/LessonPassedError';
import { redirectTo } from '../Redirect';

export interface LessonPageProps {
  number: number;
  lesson?: LessonBase;
}

function createLessonPageComponent(
  number: number,
  TLessonType: TLessonTypeC,
  lessonPageData: LessonPageData,
): (props: LessonPageProps) => JSX.Element {
  LessonPageWrapper.permission = 'IsStudent' as Permission;

  LessonPageWrapper.getInitialProps = getInitialProps(number, TLessonType);

  function LessonPageWrapper({
    lesson,
    number: number_,
  }: LessonPageProps): JSX.Element {
    if (typeof lesson === 'undefined')
      throw new Error('Must be redirected to results');

    return (
      <MainLayout title={`Lesson ${number_} – ${lesson.title}`}>
        <LessonPage
          number={number_}
          lesson={lesson}
          lessonPageData={lessonPageData}
        />
      </MainLayout>
    );
  }

  return LessonPageWrapper;
}

const getInitialProps = (number: number, TLessonType: TLessonTypeC) => async ({
  req,
  res,
}: NextPageContext): Promise<LessonPageProps> => {
  return {
    lesson: await fetchLesson(req, res, number, TLessonType)(),
    number,
  };
};

function fetchLesson(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
  number: number,
  TLessonType: TLessonTypeC,
): Task<LessonBase | undefined> {
  return pipe(
    HttpService.get(`/lesson/${number}/`, TLessonType, req),
    fold(
      err => {
        if (!(err instanceof HttpError)) throw err;
        const error = LessonError.identify(err);
        if (error instanceof LessonPassedError) {
          return (): Promise<void> => redirectTo(`/lesson/${number}/results`);
        }
        throw error;
      },
      lesson => of(lesson),
    ),
  );
}

export { createLessonPageComponent };
