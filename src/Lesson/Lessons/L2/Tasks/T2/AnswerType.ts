import { object, number } from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer2Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema2 = object().shape({
  x: number().integer().required('Это поле является обязательным'),
  y: number().integer().required('Это поле является обязательным'),
  z: number().integer().required('Это поле является обязательным'),
});

const initialValues2: Answer2Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema2, initialValues2 };
