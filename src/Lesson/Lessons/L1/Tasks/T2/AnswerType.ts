import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { matrix } from '../../../../../Utils/io-ts';
import { matrix as Ymatrix } from '../../../../../Utils/validationSchema';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer2Type = intersection([
  TAnswerBase,
  type({
    product: matrix(number),
    trace: number,
  }),
]);
export declare type Answer2Type = TypeOf<typeof TAnswer2Type>;

const validationSchema2 = Y.object().shape({
  product: Ymatrix(Y.number().integer().required()),
  trace: Y.number().integer().required(),
});

const initialValues2: Answer2Type = {
  product: [[]],
  trace: ('' as unknown) as number,
};

export { validationSchema2, initialValues2 };
