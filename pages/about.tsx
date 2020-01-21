import React from 'react';
import { Container } from '@material-ui/core';
import MainLayout from '../layouts/MainLayout';

function AboutPage(): JSX.Element {
  return (
    <MainLayout title="About page">
      <Container>About page</Container>
    </MainLayout>
  );
}

export default AboutPage;
