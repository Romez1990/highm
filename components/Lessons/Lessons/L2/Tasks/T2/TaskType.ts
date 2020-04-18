import { type, array, number, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../../src/Utils/io-ts';
import { TTaskBase } from '../../../../../../src/Lesson';

export const TTask2Type = intersection([
  TTaskBase,
  type({
    coefficientMatrix: matrix(number),
    constantTermsVector: array(number),
  }),
]);
export declare type Task2Type = TypeOf<typeof TTask2Type>;