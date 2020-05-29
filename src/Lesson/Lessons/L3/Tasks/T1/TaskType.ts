import { type, string, intersection, TypeOf } from 'io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask1Type = intersection([
  TTaskBase,
  type({
    equation: string,
    a: string,
    b: string,
    epsilon: string,
  }),
]);
export declare type Task1Type = TypeOf<typeof TTask1Type>;
