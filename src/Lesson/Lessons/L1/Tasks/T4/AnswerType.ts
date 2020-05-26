import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { matrix } from '../../../../../Utils/io-ts';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer4Type = intersection([
  TAnswerBase,
  type({
    result: matrix(number),
  }),
]);
export declare type Answer4Type = TypeOf<typeof TAnswer4Type>;

const validationSchema4 = Y.object().shape({
  result: Ymatrix(Y.number().integer().required()),
});

const initialValues4: Answer4Type = {
  result: [[]],
};

export { validationSchema4, initialValues4 };
