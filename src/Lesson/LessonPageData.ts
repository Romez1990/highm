import { ComponentType } from 'react';
import { ObjectSchema } from 'yup';
import { IntersectionC, Mixed } from 'io-ts';
import { TLessonBase } from './Lesson';
import { TaskProps } from './Task';
import { AnswerBase, AnswerProps } from './Answer';

export interface Values {
  answers: Record<string, AnswerBase>;
}

export declare type TLessonTypeC = IntersectionC<[typeof TLessonBase, Mixed]>;

export interface LessonPageData {
  tasks: ComponentType<TaskProps>[];
  answers: ComponentType<AnswerProps>[];
  validationSchema: ObjectSchema;
  initialValues: Values;
}
