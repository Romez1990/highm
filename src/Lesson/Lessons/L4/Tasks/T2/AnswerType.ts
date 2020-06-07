import {
  validationSchema1,
  initialValues1,
  Answer1Type,
} from '../T1/AnswerType';

export declare type Answer2Type = Answer1Type;

const validationSchema2 = validationSchema1;

const initialValues2: Answer2Type = { ...initialValues1 };

export { validationSchema2, initialValues2 };
