import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer1Type = intersection([
  TAnswerBase,
  type({
    x: number,
    y: number,
    z: number,
  }),
]);
export declare type Answer1Type = TypeOf<typeof TAnswer1Type>;

const validationSchema1 = Y.object().shape({
  x: Y.number().integer().required(),
  y: Y.number().integer().required(),
  z: Y.number().integer().required(),
});

const initialValues1: Answer1Type = {
  x: ('' as unknown) as number,
  y: ('' as unknown) as number,
  z: ('' as unknown) as number,
};

export { validationSchema1, initialValues1 };
