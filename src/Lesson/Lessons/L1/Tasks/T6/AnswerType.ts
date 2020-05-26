import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer6Type = intersection([
  TAnswerBase,
  type({
    determinant: number,
  }),
]);
export declare type Answer6Type = TypeOf<typeof TAnswer6Type>;

const validationSchema6 = Y.object().shape({
  determinant: Y.number().integer().required(),
});

const initialValues6: Answer6Type = {
  determinant: ('' as unknown) as number,
};

export { validationSchema6, initialValues6 };
