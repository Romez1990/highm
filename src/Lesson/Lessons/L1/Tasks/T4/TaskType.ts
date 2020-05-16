import { type, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../Utils/io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask4Type = intersection([
  TTaskBase,
  type({
    matrixA: matrix(number),
  }),
]);
export declare type Task4Type = TypeOf<typeof TTask4Type>;
