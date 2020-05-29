import { object } from 'yup';
import { intersection, Mixed, type } from 'io-ts';
import { TLessonBase } from '../../Lesson';
import { LessonPageData, TLessonTypeC } from '../../LessonForm/LessonPageData';
import Task1 from './Tasks/T1/Task';
import Answer1 from './Tasks/T1/Answer';
import { TTask1Type } from './Tasks/T1/TaskType';
import { validationSchema1, initialValues1 } from './Tasks/T1/AnswerType';

const TLessonType: TLessonTypeC = intersection([
  TLessonBase,
  type({
    tasks: type({
      task1: TTask1Type,
    }),
  }) as Mixed,
]);

const lessonPageData: LessonPageData = {
  tasks: [Task1],
  answers: [Answer1],
  validationSchema: object().shape({
    answers: object().shape({
      answer1: validationSchema1,
    }),
  }),
  initialValues: {
    answers: {
      answer1: initialValues1,
    },
  },
};

export { TLessonType, lessonPageData };
