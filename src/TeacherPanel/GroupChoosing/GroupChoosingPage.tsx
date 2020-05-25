import React from 'react';
import { NextPageContext } from 'next';
import { fetchGroups, GroupBasic } from '../../Group';
import { run } from '../../Utils/fp-ts/task';
import { MainLayout } from '../../Layout';
import GroupChoosingModel from './GroupChoosingList';
import { Permission } from '../../AuthenticationService';

interface Props {
  groups: GroupBasic[];
}

GroupChoosingPage.permission = 'IsTeacher' as Permission;

GroupChoosingPage.getInitialProps = async ({
  req,
}: NextPageContext): Promise<Props> => {
  const groups = await run(fetchGroups(req));
  return {
    groups,
  };
};

function GroupChoosingPage({ groups }: Props): JSX.Element {
  return (
    <MainLayout title="Group choosing">
      <GroupChoosingModel groups={groups} />
    </MainLayout>
  );
}

export default GroupChoosingPage;
