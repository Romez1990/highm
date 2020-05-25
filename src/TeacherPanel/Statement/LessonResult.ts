import { intersection, type, number, TypeOf, array } from 'io-ts';
import { TLessonResultBase, TTaskResult } from '../../Lesson';

export const TLessonResult = intersection([
  TLessonResultBase,
  type({
    id: number,
    studentId: number,
    n: number,
  }),
]);
export declare type LessonResult = TypeOf<typeof TLessonResult>;

export const TLessonResultAnswers = type({
  taskResults: array(TTaskResult),
});
export declare type LessonResultAnswers = TypeOf<typeof TLessonResultAnswers>;

export declare type TableLessonResult = Pick<LessonResult, 'n' | 'grade'> & {
  resultId: number;
  points: string;
};
