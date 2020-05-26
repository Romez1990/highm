import { intersection, type, number, TypeOf } from 'io-ts';
import * as Y from 'yup';
import { TAnswerBase } from '../../../../Answer';

export const TAnswer2Type = intersection([
  TAnswerBase,
  type({
    x: number,
    y: number,
    z: number,
  }),
]);
export declare type Answer2Type = TypeOf<typeof TAnswer2Type>;

const validationSchema2 = Y.object().shape({
  x: Y.number().integer().required(),
  y: Y.number().integer().required(),
  z: Y.number().integer().required(),
});

const initialValues2: Answer2Type = {
  x: ('' as unknown) as number,
  y: ('' as unknown) as number,
  z: ('' as unknown) as number,
};

export { validationSchema2, initialValues2 };
