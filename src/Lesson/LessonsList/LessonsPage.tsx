import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import { MainLayout } from '../../Layout';
import LessonsList from './LessonsList';
import { Permission } from '../../AuthenticationService';
import HttpService from '../../HttpService';
import { TLessonBasic, LessonBasic } from '../Lesson';

interface Props {
  lessons: LessonBasic[];
}

LessonsPage.permission = 'IsStudent' as Permission;

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
    <MainLayout title="Практические работы">
      <LessonsList lessons={lessons} />
    </MainLayout>
  );
}

export default LessonsPage;
