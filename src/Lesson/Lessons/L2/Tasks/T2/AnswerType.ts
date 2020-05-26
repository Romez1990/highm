import * as Y from 'yup';
import { AnswerBase } from '../../../../Answer';

export interface Answer2Type extends AnswerBase {
  x: number | '';
  y: number | '';
  z: number | '';
}

const validationSchema2 = Y.object().shape({
  x: Y.number().integer().required(),
  y: Y.number().integer().required(),
  z: Y.number().integer().required(),
});

const initialValues2: Answer2Type = {
  x: '',
  y: '',
  z: '',
};

export { validationSchema2, initialValues2 };
