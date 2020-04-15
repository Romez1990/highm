import { pipe } from 'fp-ts/lib/pipeable';
import { Either, mapLeft } from 'fp-ts/lib/Either';
import { Type } from 'io-ts';
import reporter from './reporter';
import TypeError from './TypeError';

function check<T>(type: Type<T>, data: unknown): Either<TypeError, T> {
  return pipe(type.decode(data), mapLeft(reporter(data)));
}

export default check;
