import { object, number } from 'yup';
import { AnswerBase } from '../../../../../../src/Lesson';

export interface Answer1Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema1 = object().shape({
  x: number().integer().required(),
  y: number().integer().required(),
  z: number().integer().required(),
});

const initialValues1: Answer1Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema1, initialValues1 };
