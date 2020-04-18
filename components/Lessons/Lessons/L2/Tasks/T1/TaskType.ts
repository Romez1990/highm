import { type, array, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../../src/Utils/io-ts';
import { TTaskBase } from '../../../../../../src/Lesson';

export const TTask1Type = intersection([
  TTaskBase,
  type({
    coefficientMatrix: matrix(number),
    constantTermsVector: array(number),
  }),
]);
export declare type Task1Type = TypeOf<typeof TTask1Type>;
