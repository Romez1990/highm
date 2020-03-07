import { object, number } from 'yup';
import { AnswerBase } from '../../../../../../src/Lesson';

export interface Answer3Type extends AnswerBase {
  determinant: number | '';
}

const validationSchema3 = object().shape({
  determinant: number().integer().required(),
});

const initialValues3: Answer3Type = {
  determinant: '',
};

export { validationSchema3, initialValues3 };
