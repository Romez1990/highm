import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import MainLayout from '../layouts/MainLayout';
import GroupsTable from '../components/Groups/GroupsTable';
import HttpService from '../src/HttpService';
import { TGroupBasic, GroupBasic } from '../src/Student';
import { Permission } from '../src/AuthenticationService';

interface Props {
  groups: GroupBasic[];
}

GroupsPage.permission = 'IsTeacher' as Permission;

GroupsPage.getInitialProps = async ({
  req,
}: NextPageContext): Promise<Props> => {
  return {
    groups: await fetchGroups(req)(),
  };
};

function fetchGroups(req: IncomingMessage | undefined): Task<GroupBasic[]> {
  const returnType = array(TGroupBasic);
  return pipe(
    HttpService.get('/group/', returnType, req),
    fold(
      err => {
        throw err;
      },
      groups => of(groups),
    ),
  );
}

function GroupsPage({ groups }: Props): JSX.Element {
  return (
    <MainLayout title="Groups">
      <GroupsTable groups={groups} />
    </MainLayout>
  );
}

export default GroupsPage;
