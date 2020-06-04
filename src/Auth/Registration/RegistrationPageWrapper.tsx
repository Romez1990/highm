import { ParsedUrlQuery } from 'querystring';
import React from 'react';
import { NextPageContext } from 'next';
import { pipe } from 'fp-ts/lib/pipeable';
import { sequenceT } from 'fp-ts/lib/Apply';
import {
  option,
  fromNullable,
  fold as foldO,
  isSome,
  isNone,
} from 'fp-ts/lib/Option';
import { Either, right, left, fold as foldE } from 'fp-ts/lib/Either';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { FormLayout } from '../../Layout';
import RegistrationStoreProvider from './RegistrationStoreProvider';
import RegistrationPage from './RegistrationPage';
import store from '../../Store';
import registrationStore, { RegistrationStore } from '../../Store/Registration';
import { redirectTo } from '../../Redirect';
import {
  RegistrationQueryError,
  EmptyQueryError,
  InvalidLinkError,
} from './Errors';

interface Props {
  registrationStore: RegistrationStore;
}

RegistrationPageWrapper.getInitialProps = async ({
  res,
  query,
}: NextPageContext): Promise<Props> => {
  const { profile } = store.profileStore;
  if (isSome(profile)) await redirectTo('/', res);

  await setQueryToStore(query)();

  return {
    registrationStore,
  };
};

function setQueryToStore(query: ParsedUrlQuery): Task<void> {
  return pipe(
    parseQuery(query),
    foldE(
      err => {
        if (err instanceof InvalidLinkError) {
          registrationStore.makeRegistrationCodeInvalid();
        } else if (err instanceof EmptyQueryError) {
          registrationStore.makeNoRegistrationCode();
        } else {
          throw err;
        }
        return of(undefined);
      },
      data => {
        return pipe(
          registrationStore.registrationCodeCheck(data),
          fold(
            () => of(registrationStore.makeRegistrationCodeInvalid()),
            () => of(undefined),
          ),
        );
      },
    ),
  );
}

interface Query {
  registrationCode: string;
  firstName: string;
  lastName: string;
}

function parseQuery(
  query: ParsedUrlQuery,
): Either<RegistrationQueryError, Query> {
  const sequence = sequenceT(option);
  const values = [
    fromNullable(query['registration-code']),
    fromNullable(query['first-name']),
    fromNullable(query['last-name']),
  ];
  if (values.every(isNone)) return left(new EmptyQueryError('No query params'));
  return pipe(
    sequence(values[0], values[1], values[2]),
    foldO(
      () => left(new InvalidLinkError('Not all query params')),
      ([registrationCode, firstName, lastName]) => {
        if (
          typeof registrationCode !== 'string' ||
          typeof firstName !== 'string' ||
          typeof lastName !== 'string'
        ) {
          return left(new InvalidLinkError('Query params are not strings'));
        }
        return right({
          registrationCode,
          firstName,
          lastName,
        });
      },
    ),
  );
}

function RegistrationPageWrapper({
  registrationStore: preloadedState,
}: Props): JSX.Element {
  if (process.browser) {
    registrationStore.hydrate(preloadedState);
  }

  return (
    <FormLayout title="RegistrationPage">
      <RegistrationStoreProvider>
        <RegistrationPage />
      </RegistrationStoreProvider>
    </FormLayout>
  );
}

export default RegistrationPageWrapper;
