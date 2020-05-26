import * as Y from 'yup';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer2Type extends AnswerBase {
  product: Matrix<number>;
  trace: number | '';
}

const validationSchema2 = Y.object().shape({
  product: Ymatrix(Y.number().integer().required()),
  trace: Y.number().integer().required(),
});

const initialValues2: Answer2Type = {
  product: [[]],
  trace: '',
};

export { validationSchema2, initialValues2 };
