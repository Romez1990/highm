import { type, string, number, intersection, TypeOf } from 'io-ts';
import { TTaskBase } from '../../../../Task';

export const TTask1Type = intersection([
  TTaskBase,
  type({
    integral: string,
    tolerance: number,
  }),
]);
export declare type Task1Type = TypeOf<typeof TTask1Type>;
