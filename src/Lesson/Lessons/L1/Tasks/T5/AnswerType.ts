import * as Y from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer5Type extends AnswerBase {
  x1: number | '';
  x2: number | '';
}

const validationSchema5 = Y.object().shape({
  x1: Y.number().integer().required(),
  x2: Y.number().integer().required(),
});

const initialValues5: Answer5Type = {
  x1: '',
  x2: '',
};

export { validationSchema5, initialValues5 };
