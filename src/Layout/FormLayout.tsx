import React, { Fragment } from 'react';
import { createStyles, makeStyles, Container } from '@material-ui/core';
import MainLayout from './MainLayout';
import { LayoutProps } from './BaseLayout';

const useStyles = makeStyles(
  createStyles({
    container: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
    },
  }),
);

function FormLayout({ title, children }: LayoutProps): JSX.Element {
  const classes = useStyles();
  return (
    <MainLayout title={title}>
      <Container className={classes.container} maxWidth="xs">
        <Fragment>{children}</Fragment>
      </Container>
    </MainLayout>
  );
}

export default FormLayout;
