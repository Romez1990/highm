import { object, string, number } from 'yup';
import { matrix } from '../../../../../../src/Utils/validationSchema';
import { Matrix } from '../../../../../../src/Utils/math';
import { AnswerBase } from '../../../../../../src/Lesson';

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
