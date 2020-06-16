import React from 'react';
import { Container, Card, CardContent, Typography } from '@material-ui/core';
import { MainLayout } from '../Layout';

function AboutPage(): JSX.Element {
  return (
    <MainLayout title="About page">
      <Container>
        <Card>
          <CardContent>
            <Typography>
              HighM – это Web-приложение предназначенное для образовательного
              учреждения среднего профессионального образования, в котором
              осуществляется проведение практических работ по дисциплине
              математика со студентами второго курса различных специальностей.
            </Typography>
          </CardContent>
        </Card>
      </Container>
    </MainLayout>
  );
}

export default AboutPage;
