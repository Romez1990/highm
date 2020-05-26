import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer3Type = intersection([
  TAnswerBase,
  type({
    determinant: number,
  }),
]);
export declare type Answer3Type = TypeOf<typeof TAnswer3Type>;

const validationSchema3 = Y.object().shape({
  determinant: Y.number().integer().required(),
});

const initialValues3: Answer3Type = {
  determinant: ('' as unknown) as number,
};

export { validationSchema3, initialValues3 };
