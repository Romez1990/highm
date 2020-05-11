import { object, number } from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer1Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema1 = object().shape({
  x: number().integer().required('Это поле является обязательным'),
  y: number().integer().required('Это поле является обязательным'),
  z: number().integer().required('Это поле является обязательным'),
});

const initialValues1: Answer1Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema1, initialValues1 };
