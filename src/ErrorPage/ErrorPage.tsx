import React from 'react';
import { makeStyles, createStyles, Theme, Typography } from '@material-ui/core';
import { MainLayout } from '../Layout';

interface Props {
  title: string;
  text?: string;
}

const useStyles = makeStyles(({ typography: { pxToRem } }: Theme) =>
  createStyles({
    error: {
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    title: {
      fontSize: pxToRem(30),
      fontWeight: 700,
    },
  }),
);

function ErrorPage({ title, text }: Props): JSX.Element {
  const displayText = typeof text !== 'undefined' ? text : title;

  const classes = useStyles();

  return (
    <MainLayout title={title}>
      <div className={classes.error}>
        <Typography className={classes.title} component="h2" variant="h6">
          {displayText}
        </Typography>
      </div>
    </MainLayout>
  );
}

export default ErrorPage;
