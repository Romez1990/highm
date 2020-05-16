import { object, string, number } from 'yup';
import { matrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer1Type extends AnswerBase {
  whichOfProducts: string;
  product: Matrix<number>;
}

const validationSchema1 = object().shape({
  whichOfProducts: string().oneOf(['AB', 'BA']).required(),
  product: matrix(number().integer().required()),
});

const initialValues1: Answer1Type = {
  whichOfProducts: '',
  product: [[]],
};

export { validationSchema1, initialValues1 };
