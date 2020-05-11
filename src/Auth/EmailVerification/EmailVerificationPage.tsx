import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import {
  Option,
  fromNullable,
  some,
  none,
  chain,
  fold as foldO,
} from 'fp-ts/lib/Option';
import { Task, of, map } from 'fp-ts/lib/Task';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import { fold } from 'fp-ts/lib/TaskEither';
import { FormLayout } from '../../Layout';
import EmailVerification from './EmailVerification';
import AuthenticationService from '../../AuthenticationService';

interface Props {
  verificationKey: Option<string>;
}

EmailVerificationPage.getInitialProps = async ({
  query,
}: NextPageContext): Promise<Props> => {
  return {
    verificationKey: await isKeyValid(query)(),
  };
};

function isKeyValid(query: ParsedUrlQuery): TaskOption<string> {
  return pipe(
    parseKey(query),
    foldO(
      () => of(none),
      key =>
        pipe(
          checkKey(key),
          map(valid => (valid ? some(key) : none)),
        ),
    ),
  );
}

function parseKey(query: ParsedUrlQuery): Option<string> {
  return pipe(
    fromNullable(query.key),
    chain(key => (typeof key !== 'string' ? none : some(key))),
  );
}

function checkKey(key: string): Task<boolean> {
  return pipe(
    AuthenticationService.emailVerificationKeyCheck(key),
    fold(
      () => of(false),
      () => of(true),
    ),
  );
}

function EmailVerificationPage({ verificationKey }: Props): JSX.Element {
  return (
    <FormLayout title="Подтверждение электронной почты">
      <EmailVerification verificationKey={verificationKey} />
    </FormLayout>
  );
}

export default EmailVerificationPage;
