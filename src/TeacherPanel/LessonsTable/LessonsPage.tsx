import { NextPageContext } from 'next';
import { IncomingMessage } from 'http';
import React from 'react';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import { MainLayout } from '../../Layout';
import LessonsTable from './LessonsTable';
import { Permission } from '../../AuthenticationService';
import HttpService from '../../HttpService';
import { run } from '../../Utils/fp-ts/task';
import { getGroup } from '../../Group';
import { TLesson, Lesson } from './Lesson';

interface Props {
  group: string;
  lessons: Lesson[];
}

LessonsPage.permission = 'IsTeacher' as Permission;

LessonsPage.getInitialProps = async ({
  req,
  query,
}: NextPageContext): Promise<Props> => {
  const group = getGroup(query);
  const lessons = await run(fetchLessons(group, req));
  return {
    group,
    lessons,
  };
};

function fetchLessons(
  group: string,
  req: IncomingMessage | undefined,
): Task<Lesson[]> {
  return pipe(
    HttpService.get(
      `teacher-panel/group/${group}/lesson/`,
      array(TLesson),
      req,
    ),
    fold(
      err => {
        throw err;
      },
      lessons => of(lessons),
    ),
  );
}

function LessonsPage({ group, lessons }: Props): JSX.Element {
  const title = `Lessons of group ${group}`;

  return (
    <MainLayout title={title}>
      <LessonsTable title={title} group={group} lessons={lessons} />
    </MainLayout>
  );
}

export default LessonsPage;
