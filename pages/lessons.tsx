import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import MainLayout from '../layouts/MainLayout';
import LessonsList from '../components/Lessons/LessonsList';
import { Permission } from '../src/AuthenticationService';
import HttpService from '../src/HttpService';
import { TLessonBasic, LessonBasic } from '../src/Lesson';
import ProfilePage from './profile';

interface Props {
  lessons: LessonBasic[];
}

ProfilePage.permission = 'IsStudent' as Permission;

LessonsPage.getInitialProps = async ({
  req,
}: NextPageContext): Promise<Props> => {
  return {
    lessons: await fetchLessons(req)(),
  };
};

function fetchLessons(req: IncomingMessage | undefined): Task<LessonBasic[]> {
  const returnType = array(TLessonBasic);
  return pipe(
    HttpService.get('/lesson/', returnType, req),
    fold(
      err => {
        throw err;
      },
      lessons => of(lessons),
    ),
  );
}

function LessonsPage({ lessons }: Props): JSX.Element {
  return (
    <MainLayout title="Lessons">
      <LessonsList lessons={lessons} />
    </MainLayout>
  );
}

export default LessonsPage;
