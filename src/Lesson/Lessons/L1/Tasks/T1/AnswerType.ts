import * as Y from 'yup';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer1Type extends AnswerBase {
  whichOfProducts: string;
  product: Matrix<number>;
}

const validationSchema1 = Y.object().shape({
  whichOfProducts: Y.string().oneOf(['AB', 'BA']).required(),
  product: Ymatrix(Y.number().integer().required()),
});

const initialValues1: Answer1Type = {
  whichOfProducts: '',
  product: [[]],
};

export { validationSchema1, initialValues1 };
