import { intersection, type, number, array, TypeOf } from 'io-ts';
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

export declare type TableLessonResult = Pick<LessonResult, 'n' | 'grade'> & {
  resultId: number;
  points: string;
};

export const TLessonResultAnswers = type({
  taskResults: array(TTaskResult),
});
export declare type LessonResultAnswers = TypeOf<typeof TLessonResultAnswers>;
