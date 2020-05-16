import { type, array, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../Utils/io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask1Type = intersection([
  TTaskBase,
  type({
    coefficientMatrix: matrix(number),
    constantTermsVector: array(number),
  }),
]);
export declare type Task1Type = TypeOf<typeof TTask1Type>;
