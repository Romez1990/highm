import * as Y from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer3Type extends AnswerBase {
  determinant: number | '';
}

const validationSchema3 = Y.object().shape({
  determinant: Y.number().integer().required(),
});

const initialValues3: Answer3Type = {
  determinant: '',
};

export { validationSchema3, initialValues3 };
