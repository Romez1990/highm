import { pipe } from 'fp-ts/lib/pipeable';
import { reduce } from 'fp-ts/lib/Array';
import { merge } from 'ramda';

function foldErrors<A extends Record<string, string | undefined>>(
  errs: A[],
): A {
  return pipe(errs, reduce<A, A>({} as A, merge));
}

export { foldErrors };
