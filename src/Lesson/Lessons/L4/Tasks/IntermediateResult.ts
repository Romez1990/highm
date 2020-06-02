import { array, number, object } from 'yup';

export interface IntermediateResult<T extends number | string> {
  x: T | '';
  y: T | '';
}

export const intermediateResults = array(
  object().shape({
    x: number().required(),
    y: number().required(),
  }),
).required();
