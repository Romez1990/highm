import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import MainLayout from '../layouts/MainLayout';
import TeachersTable from '../components/Teachers/TeachersTable';
import HttpService from '../src/HttpService';
import { Permission } from '../src/AuthenticationService';
import { TTeacher, Teacher } from '../src/Teacher';

interface Props {
  teachers: Teacher[];
}

TeachersPage.permission = 'IsAdmin' as Permission;

TeachersPage.getInitialProps = async ({
  req,
}: NextPageContext): Promise<Props> => {
  return {
    teachers: await fetchTeachers(req)(),
  };
};

function fetchTeachers(req: IncomingMessage | undefined): Task<Teacher[]> {
  const returnType = array(TTeacher);
  return pipe(
    HttpService.get('/teacher/', returnType, req),
    fold(
      err => {
        throw err;
      },
      teachers => of(teachers),
    ),
  );
}

function TeachersPage({ teachers }: Props): JSX.Element {
  return (
    <MainLayout title="Teachers">
      <TeachersTable teachers={teachers} />
    </MainLayout>
  );
}

export default TeachersPage;
