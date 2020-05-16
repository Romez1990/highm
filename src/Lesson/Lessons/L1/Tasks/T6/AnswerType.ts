import { object, number } from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer6Type extends AnswerBase {
  determinant: number | '';
}

const validationSchema6 = object().shape({
  determinant: number().integer().required(),
});

const initialValues6: Answer6Type = {
  determinant: '',
};

export { validationSchema6, initialValues6 };
