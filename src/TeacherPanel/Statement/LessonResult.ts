import { intersection, type, number, TypeOf } from 'io-ts';
import { TLessonResultBase } from '../../Lesson';

export const TLessonResult = intersection([
  TLessonResultBase,
  type({
    id: number,
    studentId: number,
    n: number,
  }),
]);
export declare type LessonResult = TypeOf<typeof TLessonResult>;

export declare type TableLessonResult = Pick<LessonResult, 'n' | 'grade'> & {
  resultId: number;
  points: string;
};
