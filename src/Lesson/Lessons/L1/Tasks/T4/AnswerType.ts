import { object, number } from 'yup';
import { matrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer4Type extends AnswerBase {
  result: Matrix<number>;
}

const validationSchema4 = object().shape({
  result: matrix(number().integer().required()),
});

const initialValues4: Answer4Type = {
  result: [[]],
};

export { validationSchema4, initialValues4 };
