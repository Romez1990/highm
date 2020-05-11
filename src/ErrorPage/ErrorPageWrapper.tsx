import React from 'react';
import { NextPageContext } from 'next';
import ErrorPage from './ErrorPage';

ErrorPageWrapper.getInitialProps = async ({
  err,
}: NextPageContext): Promise<void> => {
  // eslint-disable-next-line no-console
  console.log(err);
};

function ErrorPageWrapper(): JSX.Element {
  return <ErrorPage title="Ошибка" text="Упс, что-то пошло не так" />;
}

export default ErrorPageWrapper;
