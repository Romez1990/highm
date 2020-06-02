import { object } from 'yup';
import { intersection, Mixed, type } from 'io-ts';
import { TLessonBase } from '../../Lesson';
import { LessonPageData, TLessonTypeC } from '../../LessonForm/LessonPageData';
import Task1 from './Tasks/T1/Task';
import Answer1 from './Tasks/T1/Answer';
import { TTask1Type } from './Tasks/T1/TaskType';
import { validationSchema1, initialValues1 } from './Tasks/T1/AnswerType';
import Task2 from './Tasks/T2/Task';
import Answer2 from './Tasks/T2/Answer';
import { TTask2Type } from './Tasks/T2/TaskType';
import { validationSchema2, initialValues2 } from './Tasks/T2/AnswerType';

const TLessonType: TLessonTypeC = intersection([
  TLessonBase,
  type({
    tasks: type({
      task1: TTask1Type,
      task2: TTask2Type,
    }),
  }) as Mixed,
]);

const lessonPageData: LessonPageData = {
  tasks: [Task1, Task2],
  answers: [Answer1, Answer2],
  validationSchema: object().shape({
    answers: object().shape({
      answer1: validationSchema1,
      answer2: validationSchema2,
    }),
  }),
  initialValues: {
    answers: {
      answer1: initialValues1,
      answer2: initialValues2,
    },
  },
};

export { TLessonType, lessonPageData };
