import { union, TypeOf } from 'io-ts';
import {
  TRegisteredUser,
  TUnregisteredUser,
  TUnregisteredUserNew,
} from '../User';

export const TRegisteredTeacher = TRegisteredUser;
export declare type RegisteredTeacher = TypeOf<typeof TRegisteredTeacher>;

export const TUnregisteredTeacher = TUnregisteredUser;
export declare type UnregisteredTeacher = TypeOf<typeof TUnregisteredTeacher>;

export const TUnregisteredTeacherNew = TUnregisteredUserNew;
export declare type UnregisteredTeacherNew = TypeOf<
  typeof TUnregisteredTeacherNew
>;

export const TTeacher = union([TRegisteredTeacher, TUnregisteredTeacher]);
export declare type Teacher = TypeOf<typeof TTeacher>;
