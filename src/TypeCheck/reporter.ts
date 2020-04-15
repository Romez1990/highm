import { pipe } from 'fp-ts/lib/pipeable';
import { map, filter, last, compact } from 'fp-ts/lib/Array';
import { map as mapO } from 'fp-ts/lib/Option';
import { Errors, ContextEntry } from 'io-ts';
import { join } from '../Utils/fp-ts/array';
import TypeError from './TypeError';

const reporter = (data: unknown) => (errs: Errors): TypeError => {
  return pipe(
    errs,
    map(err => {
      // https://github.com/gcanti/fp-ts/pull/544/files
      const context = err.context as Array<ContextEntry>;
      const path = getPath(context);

      return pipe(
        context,
        last,
        mapO(errorContext => {
          const expectedType = errorContext.type.name;
          const atPath = path === '' ? '' : ` at ${path}`;
          return (
            `Expecting ${expectedType}${atPath} but instead got: ` +
            `${JSON.stringify(err.value)}`
          );
        }),
      );
    }),
    compact,
    errs_ => new TypeError(data, errs_),
  );
};

function getPath(context: Array<ContextEntry>): string {
  return pipe(
    context,
    map(c => c.key),
    filter(key => key.length > 0),
    join('.'),
  );
}

export default reporter;
