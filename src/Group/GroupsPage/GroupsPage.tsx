import React from 'react';
import { NextPageContext } from 'next';
import { MainLayout } from '../../Layout';
import GroupsTable from './GroupsTable';
import { Permission } from '../../AuthenticationService';
import { GroupBasic } from '../Group';
import fetchGroups from './fetchGroups';

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

function GroupsPage({ groups }: Props): JSX.Element {
  return (
    <MainLayout title="Группы">
      <GroupsTable groups={groups} />
    </MainLayout>
  );
}

export default GroupsPage;
