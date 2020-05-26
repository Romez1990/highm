import { type } from 'io-ts';
import { TAnswer1Type } from './Tasks/T1/AnswerType';
import { TAnswer2Type } from './Tasks/T2/AnswerType';
import { TAnswer3Type } from './Tasks/T3/AnswerType';
import { TAnswer4Type } from './Tasks/T4/AnswerType';
import { TAnswer5Type } from './Tasks/T5/AnswerType';
import { TAnswer6Type } from './Tasks/T6/AnswerType';

export const LessonAnswerType = type({
  0: TAnswer1Type,
  1: TAnswer2Type,
  2: TAnswer3Type,
  3: TAnswer4Type,
  4: TAnswer5Type,
  5: TAnswer6Type,
});
