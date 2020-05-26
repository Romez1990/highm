import * as Y from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer6Type extends AnswerBase {
  determinant: number | '';
}

const validationSchema6 = Y.object().shape({
  determinant: Y.number().integer().required(),
});

const initialValues6: Answer6Type = {
  determinant: '',
};

export { validationSchema6, initialValues6 };
