import React from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import { MainLayout } from '../Layout';

interface Props {
  title: string;
  text?: string;
}

const useStyles = makeStyles(({ typography: { pxToRem } }: Theme) =>
  createStyles({
    error: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", ' +
        'Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
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
        <h2 className={classes.title}>{displayText}</h2>
      </div>
    </MainLayout>
  );
}

export default ErrorPage;
