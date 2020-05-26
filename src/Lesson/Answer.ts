import { UnknownRecord, TypeOf } from 'io-ts';

export const TAnswerBase = UnknownRecord;
export type AnswerBase = TypeOf<typeof TAnswerBase>;

export interface AnswerProps {
  name: string;
}
