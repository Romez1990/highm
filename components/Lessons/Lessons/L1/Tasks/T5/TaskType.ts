import { type, string, intersection, TypeOf } from 'io-ts';
import { matrix } from '../../../../../../src/Utils/io-ts';
import { TTaskBase } from '../../../../../../src/Lesson';

export const TTask5Type = intersection([
  TTaskBase,
  type({
    equation: matrix(string),
  }),
]);
export declare type Task5Type = TypeOf<typeof TTask5Type>;
