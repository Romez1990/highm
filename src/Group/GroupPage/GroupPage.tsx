import React from 'react';
import { NextPageContext } from 'next';
import { Option, isNone } from 'fp-ts/lib/Option';
import { ErrorPage } from '../../ErrorPage';
import { MainLayout } from '../../Layout';
import GroupTable from './GroupTable';
import { Permission } from '../../AuthenticationService';
import { getGroup, fetchGroup } from './fetchGroup';
import { Group } from '../Group';

interface Props {
  group: Option<Group>;
}

GroupPage.permission = 'IsTeacher' as Permission;

GroupPage.getInitialProps = async ({
  req,
  query,
}: NextPageContext): Promise<Props> => {
  const group = getGroup(query);
  return {
    group: await fetchGroup(group, req)(),
  };
};

function GroupPage({ group: groupOption }: Props): JSX.Element {
  if (isNone(groupOption)) {
    return <ErrorPage title="Group not found" />;
  }

  const group = groupOption.value;

  return (
    <MainLayout title={`Группа ${group.name}`}>
      <GroupTable group={group} />
    </MainLayout>
  );
}

export default GroupPage;
