import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer5Type = intersection([
  TAnswerBase,
  type({
    x1: number,
    x2: number,
  }),
]);
export declare type Answer5Type = TypeOf<typeof TAnswer5Type>;

const validationSchema5 = Y.object().shape({
  x1: Y.number().integer().required(),
  x2: Y.number().integer().required(),
});

const initialValues5: Answer5Type = {
  x1: ('' as unknown) as number,
  x2: ('' as unknown) as number,
};

export { validationSchema5, initialValues5 };
