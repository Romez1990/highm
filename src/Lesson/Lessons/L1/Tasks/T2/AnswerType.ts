import { object, number } from 'yup';
import { matrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer2Type extends AnswerBase {
  product: Matrix<number>;
  trace: number | '';
}

const validationSchema2 = object().shape({
  product: matrix(number().integer().required()),
  trace: number().integer().required(),
});

const initialValues2: Answer2Type = {
  product: [[]],
  trace: '',
};

export { validationSchema2, initialValues2 };
