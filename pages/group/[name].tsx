import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none, isNone } from 'fp-ts/lib/Option';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import ErrorPage from '../_error';
import MainLayout from '../../layouts/MainLayout';
import GroupTable from '../../components/Groups/GroupTable';
import HttpService, { NotFoundError } from '../../src/HttpService';
import { Permission } from '../../src/AuthenticationService';
import { TGroup, Group } from '../../src/Student';

interface Props {
  group: Option<Group>;
}

GroupPage.permission = 'IsTeacher' as Permission;

GroupPage.getInitialProps = async ({
  req,
  query,
}: NextPageContext): Promise<Props> => {
  return {
    group: await fetchGroup(query, req)(),
  };
};

function fetchGroup(
  { name }: ParsedUrlQuery,
  req?: IncomingMessage,
): TaskOption<Group> {
  if (typeof name !== 'string') return of(none);
  return pipe(
    HttpService.get(`/group/${encodeURIComponent(name)}/`, TGroup, req),
    fold(
      err => {
        if (!(err instanceof NotFoundError)) throw err;
        return of(none);
      },
      group => of(some(group)),
    ),
  );
}

function GroupPage({ group: groupOption }: Props): JSX.Element {
  if (isNone(groupOption)) {
    return <ErrorPage statusCode={404} title="Group not found" />;
  }

  const group = groupOption.value;

  return (
    <MainLayout title={`Group ${group.name}`}>
      <GroupTable group={group} />
    </MainLayout>
  );
}

export default GroupPage;
