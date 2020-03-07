import { object, number } from 'yup';
import { AnswerBase } from '../../../../../../src/Lesson';

export interface Answer5Type extends AnswerBase {
  x1: number | '';
  x2: number | '';
}

const validationSchema5 = object().shape({
  x1: number().integer().required(),
  x2: number().integer().required(),
});

const initialValues5: Answer5Type = {
  x1: '',
  x2: '',
};

export { validationSchema5, initialValues5 };
