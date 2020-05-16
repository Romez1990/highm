import { type, array, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../Utils/io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask2Type = intersection([
  TTaskBase,
  type({
    coefficientMatrix: matrix(number),
    constantTermsVector: array(number),
  }),
]);
export declare type Task2Type = TypeOf<typeof TTask2Type>;
