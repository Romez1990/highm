import { IncomingMessage } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { MainLayout } from '../../Layout';
import GroupStatementTable from './GroupStatementTable';
import HttpService from '../../HttpService';
import { Permission } from '../../AuthenticationService';
import { getGroup } from '../../Group';
import { run } from '../../Utils/fp-ts/task';
import { TGroupStatement, GroupStatement } from '../Statement';

interface Props {
  statement: GroupStatement;
  group: string;
}

GroupStatementPage.permission = 'IsTeacher' as Permission;

GroupStatementPage.getInitialProps = async ({
  req,
  query,
}: NextPageContext): Promise<Props> => {
  const group = getGroup(query);
  const statement = await run(fetchGroupStatement(req, group));
  return {
    statement,
    group,
  };
};

function fetchGroupStatement(
  req: IncomingMessage | undefined,
  group: string,
): Task<GroupStatement> {
  const encodedGroup = encodeURIComponent(group);
  return pipe(
    HttpService.get(
      `/teacher-panel/group/${encodedGroup}/statement/`,
      TGroupStatement,
      req,
    ),
    fold(
      err => {
        throw err;
      },
      statement => of(statement),
    ),
  );
}

function GroupStatementPage({ statement, group }: Props): JSX.Element {
  const title = `Ведомость на группу ${group}`;

  return (
    <MainLayout title={title}>
      <GroupStatementTable title={title} statement={statement} group={group} />
    </MainLayout>
  );
}

export default GroupStatementPage;
