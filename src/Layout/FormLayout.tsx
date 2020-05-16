import React from 'react';
import { createStyles, makeStyles, Grid, Container } from '@material-ui/core';
import MainLayout from './MainLayout';
import { LayoutProps } from './BaseLayout';

const useStyles = makeStyles(
  createStyles({
    wrapper: {
      minHeight: '100vh',
    },
  }),
);

function FormLayout({ title, children }: LayoutProps): JSX.Element {
  const classes = useStyles();
  return (
    <MainLayout title={title}>
      <Grid
        className={classes.wrapper}
        container
        alignItems="center"
        justify="center"
      >
        <Grid item>
          <Container maxWidth="xs">{children}</Container>
        </Grid>
      </Grid>
    </MainLayout>
  );
}

export default FormLayout;
