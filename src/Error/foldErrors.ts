import { pipe } from 'fp-ts/lib/pipeable';
import { reduce } from 'fp-ts/lib/Array';
import { merge } from 'ramda';

function foldErrors<A extends object>(errs: A[]): object {
  return pipe(errs, reduce<object, object>({}, merge));
}

export { foldErrors };
