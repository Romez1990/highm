import React from 'react';
import { isNone } from 'fp-ts/lib/Option';
import MainLayout from '../layouts/MainLayout';
import store from '../store';
import { Profile } from '../src/Profile';
import { PermissionError, Permission } from '../src/AuthenticationService';

interface Props {
  profile: Profile;
}

ProfilePage.permission = 'IsAuthenticated' as Permission;

ProfilePage.getInitialProps = async (): Promise<Props> => {
  if (isNone(store.profileStore.profile))
    throw new PermissionError('Profile is none after applying permission');
  const profile = store.profileStore.profile.value;
  return {
    profile,
  };
};

function ProfilePage({ profile }: Props): JSX.Element {
  return (
    <MainLayout title="Profile">
      <pre>{JSON.stringify(profile, null, 2)}</pre>
    </MainLayout>
  );
}

export default ProfilePage;
