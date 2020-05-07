import { pipe } from 'fp-ts/lib/pipeable';
import { findFirstMap, filterMap, isNonEmpty } from 'fp-ts/lib/Array';
import { NonEmptyArray } from 'fp-ts/lib/NonEmptyArray';
import { Option, fold } from 'fp-ts/lib/Option';

export declare type ErrorIdentifier<A extends Error, B extends Error> = (
  err: A,
) => Option<B>;

const identifyError = <A extends Error>(err: A) => <B extends Error>(
  identifiers: ErrorIdentifier<A, B>[],
): B => {
  return pipe(
    identifiers,
    findFirstMap(identify => identify(err)),
    fold(
      () => {
        throw err;
      },
      networkError => networkError,
    ),
  );
};

const identifyErrors = <A extends Error>(err: A) => <B extends Error>(
  identifiers: ErrorIdentifier<A, B>[],
): NonEmptyArray<B> => {
  return pipe(
    identifiers,
    filterMap(identify => identify(err)),
    array => {
      if (!isNonEmpty(array)) {
        throw err;
      }
      return array;
    },
  );
};

export { identifyError, identifyErrors };
