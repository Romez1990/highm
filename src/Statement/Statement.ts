import {
  type,
  number,
  string,
  literal,
  array,
  nullType,
  union,
  TypeOf,
} from 'io-ts';

export const TGroupStatementRegisteredStudent = type({
  id: number,
  firstName: string,
  lastName: string,
  grades: array(union([number, nullType])),
  registered: literal(true),
});
export declare type GroupStatementRegisteredStudent = TypeOf<
  typeof TGroupStatementRegisteredStudent
>;

export const TGroupStatementUnregisteredStudent = type({
  registrationCode: string,
  firstName: string,
  lastName: string,
  registered: literal(false),
});
export declare type GroupStatementUnregisteredStudent = TypeOf<
  typeof TGroupStatementUnregisteredStudent
>;

export const TGroupStatementStudent = union([
  TGroupStatementRegisteredStudent,
  TGroupStatementUnregisteredStudent,
]);
export declare type GroupStatementStudent = TypeOf<
  typeof TGroupStatementStudent
>;

export const TGroupStatement = array(TGroupStatementStudent);
export declare type GroupStatement = TypeOf<typeof TGroupStatement>;
