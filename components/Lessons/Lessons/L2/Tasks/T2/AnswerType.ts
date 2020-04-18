import { object, number } from 'yup';
import { AnswerBase } from '../../../../../../src/Lesson';

export interface Answer2Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema2 = object().shape({
  x: number().integer().required(),
  y: number().integer().required(),
  z: number().integer().required(),
});

const initialValues2: Answer2Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema2, initialValues2 };
