import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { NextPageContext } from 'next';
import {
  chain,
  some,
  none,
  isSome,
  fromNullable,
  getOrElse,
} from 'fp-ts/lib/Option';
import { pipe } from 'fp-ts/lib/pipeable';
import FormLayout from '../layouts/FormLayout';
import LoginForm from '../components/Auth/LoginForm';
import store from '../store';
import { redirectTo } from '../src/Redirect';

interface Props {
  redirectUrl: string;
}

LoginPage.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<Props> => {
  const redirectUrl = getRedirectUrl(query);

  const { profile } = store.profileStore;
  if (isSome(profile)) await redirectTo(redirectUrl, res);

  return {
    redirectUrl,
  };
};

function getRedirectUrl(query: ParsedUrlQuery): string {
  return pipe(
    fromNullable(query['redirect-to']),
    chain(url => (typeof url === 'string' ? some(url) : none)),
    getOrElse(() => '/'),
  );
}

function LoginPage({ redirectUrl }: Props): JSX.Element {
  return (
    <FormLayout title="Login">
      <LoginForm redirectUrl={redirectUrl} />
    </FormLayout>
  );
}

export default LoginPage;
