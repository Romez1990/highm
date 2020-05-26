import { intersection, type, string, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { matrix } from '../../../../../Utils/io-ts';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer1Type = intersection([
  TAnswerBase,
  type({
    whichOfProducts: string,
    product: matrix(number),
  }),
]);
export declare type Answer1Type = TypeOf<typeof TAnswer1Type>;

const validationSchema1 = Y.object().shape({
  whichOfProducts: Y.string().oneOf(['AB', 'BA']).required(),
  product: Ymatrix(Y.number().integer().required()),
});

const initialValues1: Answer1Type = {
  whichOfProducts: '',
  product: [[]],
};

export { validationSchema1, initialValues1 };
