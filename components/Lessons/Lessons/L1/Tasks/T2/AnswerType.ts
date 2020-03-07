import { object, number } from 'yup';
import { matrix } from '../../../../../../src/Utils/validationSchema';
import { Matrix } from '../../../../../../src/Utils/math';
import { AnswerBase } from '../../../../../../src/Lesson';

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
