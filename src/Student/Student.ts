import { type, string, union, intersection, TypeOf } from 'io-ts';
import {
  TRegisteredUser,
  TUnregisteredUser,
  TUnregisteredUserNew,
} from '../User';

export const TRegisteredStudent = TRegisteredUser;
export declare type RegisteredStudent = TypeOf<typeof TRegisteredStudent>;

export const TUnregisteredStudentBasic = TUnregisteredUser;
export declare type UnregisteredStudentBasic = TypeOf<
  typeof TUnregisteredStudentBasic
>;

export const TUnregisteredStudent = intersection([
  TUnregisteredStudentBasic,
  type({
    groupName: string,
  }),
]);
export declare type UnregisteredStudent = TypeOf<typeof TUnregisteredStudent>;

export const TUnregisteredStudentNew = TUnregisteredUserNew;
export declare type UnregisteredStudentNew = TypeOf<
  typeof TUnregisteredStudentNew
>;

export const TUnregisteredStudentNewWithGroup = intersection([
  TUnregisteredStudentNew,
  type({
    groupName: string,
  }),
]);
export declare type UnregisteredStudentNewWithGroup = TypeOf<
  typeof TUnregisteredStudentNewWithGroup
>;

export const TStudent = union([TRegisteredStudent, TUnregisteredStudentBasic]);
export declare type Student = TypeOf<typeof TStudent>;
