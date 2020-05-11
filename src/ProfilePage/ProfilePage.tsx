import React from 'react';
import { absurd } from 'fp-ts/lib/function';
import { isNone } from 'fp-ts/lib/Option';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import { MainLayout } from '../Layout';
import store from '../Store';
import { Profile, ProfileType } from '../Profile';
import { PermissionError, Permission } from '../AuthenticationService';

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
  function displayType(type: ProfileType): string {
    if (type === 'admin') return 'Администратор';
    if (type === 'teacher') return 'Преподователь';
    if (type === 'student') return 'Студент';
    return absurd(type);
  }

  return (
    <MainLayout title="Профиль">
      <Container maxWidth="sm">
        <Card>
          <CardContent>
            <Typography>
              {displayType(profile.type)} {profile.firstName} {profile.lastName}
            </Typography>
            <Typography>Электронная почта: {profile.email}</Typography>
          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  );
}

export default ProfilePage;
