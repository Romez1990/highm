import { array, ArraySchema, Schema } from 'yup';

function matrix<T>(of: Schema<T>): ArraySchema<T[]> {
  return array().of(array().of(of).min(1).required()).min(1).required();
}

export { matrix };
