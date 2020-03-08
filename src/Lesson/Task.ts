import { type, string, TypeOf } from 'io-ts';

export const TTaskBase = type({
  text: string,
});
export declare type TaskBase = TypeOf<typeof TTaskBase>;

export interface TaskProps {
  children: TaskBase;
}
