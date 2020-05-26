import * as Y from 'yup';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { Matrix } from '../../../../../Utils/math';
import { AnswerBase } from '../../../../Answer';

export interface Answer4Type extends AnswerBase {
  result: Matrix<number>;
}

const validationSchema4 = Y.object().shape({
  result: Ymatrix(Y.number().integer().required()),
});

const initialValues4: Answer4Type = {
  result: [[]],
};

export { validationSchema4, initialValues4 };
