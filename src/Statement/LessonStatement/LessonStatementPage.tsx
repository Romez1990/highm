import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, isNone } from 'fp-ts/lib/Option';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { TaskOption, map } from 'fp-ts-contrib/lib/TaskOption';
import { array } from 'io-ts';
import LessonStatementTable from './LessonStatementTable';
import { MainLayout } from '../../Layout';
import { Permission } from '../../AuthenticationService';
import HttpService from '../../HttpService';
import { getGroup, fetchGroup } from '../../Group';
import { getLesson } from '../../Lesson';
import { run } from '../../Utils/fp-ts/task';
import { Student } from '../../Student';
import { TLessonResult, LessonResult } from './LessonResult';
import { ErrorPage } from '../../ErrorPage';

interface Props {
  group: string;
  lesson: number;
  students: Option<Student[]>;
  lessonResult: LessonResult[];
}

LessonStatementPage.permission = 'IsTeacher' as Permission;

LessonStatementPage.getInitialProps = async ({
  req,
  query,
}: NextPageContext): Promise<Props> => {
  const group = getGroup(query);
  const lesson = getLesson(query);
  const students = await run(fetchStudents(group, req));
  const lessonResult = await run(fetchLessonResult(group, lesson, req));
  return {
    group,
    lesson,
    students,
    lessonResult,
  };
};

function fetchStudents(
  group: string,
  req: IncomingMessage | undefined,
): TaskOption<Student[]> {
  return pipe(
    fetchGroup(group, req),
    map(group_ => group_.students),
  );
}

function fetchLessonResult(
  group: string,
  lesson: number,
  req: IncomingMessage | undefined,
): Task<LessonResult[]> {
  const encodedGroup = encodeURIComponent(group);
  return pipe(
    HttpService.get(
      `/teacher-panel/group/${encodedGroup}/lesson/${lesson}/result/`,
      array(TLessonResult),
      req,
    ),
    fold(
      err => {
        throw err;
      },
      lessonResult => of(lessonResult),
    ),
  );
}

function LessonStatementPage({
  group,
  lesson,
  students,
  lessonResult,
}: Props): JSX.Element {
  if (isNone(students)) {
    return <ErrorPage title="Group not found" />;
  }

  const title = `Ведомость группы ${group} по работе №${lesson}`;

  return (
    <MainLayout title={title}>
      <LessonStatementTable
        group={group}
        title={title}
        lesson={lesson}
        students={students.value}
        lessonResult={lessonResult}
      />
    </MainLayout>
  );
}

export default LessonStatementPage;
