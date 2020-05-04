import React from 'react';
import { Container } from '@material-ui/core';
import MainLayout from '../layouts/MainLayout';

function MainPage(): JSX.Element {
  return (
    <MainLayout title="Main page">
      <Container>Main page</Container>
    </MainLayout>
  );
}

export default MainPage;
