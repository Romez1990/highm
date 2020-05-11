import { object, number } from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer1Type extends AnswerBase {
  x: number | '';
}

const validationSchema1 = object().shape({
  x: number().required('Это поле является обязательным'),
});

const initialValues1: Answer1Type = {
  x: '',
};

export { validationSchema1, initialValues1 };
