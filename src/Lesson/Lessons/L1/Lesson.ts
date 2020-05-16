import { type, intersection, Mixed } from 'io-ts';
import { object } from 'yup';
import { TLessonBase } from '../../Lesson';
import { TLessonTypeC, LessonPageData } from '../../LessonPageData';
import Task1 from './Tasks/T1/Task';
import Answer1 from './Tasks/T1/Answer';
import { TTask1Type } from './Tasks/T1/TaskType';
import { validationSchema1, initialValues1 } from './Tasks/T1/AnswerType';
import Task2 from './Tasks/T2/Task';
import Answer2 from './Tasks/T2/Answer';
import { TTask2Type } from './Tasks/T2/TaskType';
import { validationSchema2, initialValues2 } from './Tasks/T2/AnswerType';
import Task3 from './Tasks/T3/Task';
import Answer3 from './Tasks/T3/Answer';
import { TTask3Type } from './Tasks/T3/TaskType';
import { validationSchema3, initialValues3 } from './Tasks/T3/AnswerType';
import Task4 from './Tasks/T4/Task';
import Answer4 from './Tasks/T4/Answer';
import { TTask4Type } from './Tasks/T4/TaskType';
import { validationSchema4, initialValues4 } from './Tasks/T4/AnswerType';
import Task5 from './Tasks/T5/Task';
import Answer5 from './Tasks/T5/Answer';
import { TTask5Type } from './Tasks/T5/TaskType';
import { validationSchema5, initialValues5 } from './Tasks/T5/AnswerType';
import Task6 from './Tasks/T6/Task';
import Answer6 from './Tasks/T6/Answer';
import { TTask6Type } from './Tasks/T6/TaskType';
import { validationSchema6, initialValues6 } from './Tasks/T6/AnswerType';

const TLessonType: TLessonTypeC = intersection([
  TLessonBase,
  type({
    tasks: type({
      task1: TTask1Type,
      task2: TTask2Type,
      task3: TTask3Type,
      task4: TTask4Type,
      task5: TTask5Type,
      task6: TTask6Type,
    }),
  }) as Mixed,
]);

const lessonPageData: LessonPageData = {
  tasks: [Task1, Task2, Task3, Task4, Task5, Task6],
  answers: [Answer1, Answer2, Answer3, Answer4, Answer5, Answer6],
  validationSchema: object().shape({
    answers: object().shape({
      answer1: validationSchema1,
      answer2: validationSchema2,
      answer3: validationSchema3,
      answer4: validationSchema4,
      answer5: validationSchema5,
      answer6: validationSchema6,
    }),
  }),
  initialValues: {
    answers: {
      answer1: initialValues1,
      answer2: initialValues2,
      answer3: initialValues3,
      answer4: initialValues4,
      answer5: initialValues5,
      answer6: initialValues6,
    },
  },
};

export { TLessonType, lessonPageData };
