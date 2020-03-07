import { type, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../../src/Utils/io-ts';
import { TTaskBase } from '../../../../../../src/Lesson';

export const TTask3Type = intersection([
  TTaskBase,
  type({
    matrixA: matrix(number),
  }),
]);
export declare type Task3Type = TypeOf<typeof TTask3Type>;
