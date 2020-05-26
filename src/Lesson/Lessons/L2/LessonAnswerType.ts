import { type } from 'io-ts';
import { TAnswer1Type } from './Tasks/T1/AnswerType';
import { TAnswer2Type } from './Tasks/T2/AnswerType';

export const LessonAnswerType = type({
  0: TAnswer1Type,
  1: TAnswer2Type,
});
