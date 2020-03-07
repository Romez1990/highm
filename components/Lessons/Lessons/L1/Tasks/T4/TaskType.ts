import { type, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../../src/Utils/io-ts';
import { TTaskBase } from '../../../../../../src/Lesson';

export const TTask4Type = intersection([
  TTaskBase,
  type({
    matrixA: matrix(number),
  }),
]);
export declare type Task4Type = TypeOf<typeof TTask4Type>;
