import { ServerResponse } from 'http';
import React from 'react';
import { NextPageContext } from 'next';
import { makeStyles, createStyles } from '@material-ui/core';
import { BaseLayout } from '../Layout';

interface Props {
  statusCode?: number;
  title?: string;
}

ErrorPage.getInitialProps = async ({
  res,
  err,
}: NextPageContext): Promise<Props> => {
  return {
    statusCode: getStatusCode(res, err),
  };
};

function getStatusCode(
  res: ServerResponse | undefined,
  err:
    | (Error & {
        statusCode?: number;
      })
    | null
    | undefined,
): number | undefined {
  if (typeof res !== 'undefined') {
    return res.statusCode;
  }

  return typeof err !== 'undefined' && err !== null ? err.statusCode : 404;
}

const useStyles = makeStyles(
  createStyles({
    error: {
      fontFamily:
        '-apple-system, BlinkMacSystemFont, Roboto, "Segoe UI", "Fira Sans", ' +
        'Avenir, "Helvetica Neue", "Lucida Grande", sans-serif',
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    statusCode: {
      marginRight: 20,
      padding: '10px 23px 10px 0',
      borderRight: '1px solid rgba(0, 0, 0,.3)',
      fontSize: 24,
      fontWeight: 500,
    },
    title: {
      fontSize: 14,
      fontWeight: 'normal',
    },
  }),
);

const defaultTitles: Record<number, string> = {
  400: 'Bad Request',
  404: 'Page not found',
  405: 'Method Not Allowed',
  500: 'Server error',
};

const fallbackTitle = 'Oops! Something went wrong';

function ErrorPage({ statusCode, title }: Props): JSX.Element {
  const classes = useStyles();

  const displayTitle =
    typeof title === 'undefined'
      ? defaultTitles[statusCode ?? -1] ?? fallbackTitle
      : title;

  let pageTitle = '';
  if (typeof statusCode !== 'undefined') pageTitle += `${statusCode}: `;
  pageTitle += displayTitle;

  return (
    <BaseLayout title={pageTitle}>
      <div className={classes.error}>
        {statusCode && <h1 className={classes.statusCode}>{statusCode}</h1>}
        <h2 className={classes.title}>{displayTitle}</h2>
      </div>
    </BaseLayout>
  );
}

export default ErrorPage;
