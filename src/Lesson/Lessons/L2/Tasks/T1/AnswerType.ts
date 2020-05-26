import * as Y from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer1Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema1 = Y.object().shape({
  x: Y.number().integer().required(),
  y: Y.number().integer().required(),
  z: Y.number().integer().required(),
});

const initialValues1: Answer1Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema1, initialValues1 };
