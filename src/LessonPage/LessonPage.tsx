import React from 'react';
import { NextPageContext } from 'next';
import { IncomingMessage } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService from '../HttpService';
import { Permission } from '../AuthenticationService';
import { LessonBase } from '../Lesson';
import MainLayout from '../../layouts/MainLayout';
import Lesson from '../../components/Lessons/Lesson';
import { TLessonTypeC, LessonPageData } from './LessonPageData';

export interface LessonPageProps {
  number: number;
  lesson: LessonBase;
}

function createLessonPageComponent(
  number: number,
  TLessonType: TLessonTypeC,
  lessonPageData: LessonPageData,
): (props: LessonPageProps) => JSX.Element {
  LessonPage.permission = 'IsStudent' as Permission;

  LessonPage.getInitialProps = getInitialProps(number, TLessonType);

  function LessonPage({
    lesson,
    number: number_,
  }: LessonPageProps): JSX.Element {
    return (
      <MainLayout title={`Lesson ${number_} – ${lesson.title}`}>
        <Lesson
          number={number_}
          lesson={lesson}
          lessonPageData={lessonPageData}
        />
      </MainLayout>
    );
  }

  return LessonPage;
}

const getInitialProps = (number: number, TLessonType: TLessonTypeC) => async ({
  req,
}: NextPageContext): Promise<LessonPageProps> => {
  return {
    lesson: await fetchLesson(req, number, TLessonType)(),
    number,
  };
};

function fetchLesson(
  req: IncomingMessage | undefined,
  number: number,
  TLessonType: TLessonTypeC,
): Task<LessonBase> {
  return pipe(
    HttpService.get(`/lesson/${number}/`, TLessonType, req),
    fold(
      err => {
        throw err;
      },
      lesson => of(lesson),
    ),
  );
}

export { createLessonPageComponent };
