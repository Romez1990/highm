import { type, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../Utils/io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask1Type = intersection([
  TTaskBase,
  type({
    matrixA: matrix(number),
    matrixB: matrix(number),
  }),
]);
export declare type TaskType = TypeOf<typeof TTask1Type>;
