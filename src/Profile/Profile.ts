import { type, string, boolean, literal, union, TypeOf } from 'io-ts';

export const TProfile = type({
  firstName: string,
  lastName: string,
  type: union([literal('admin'), literal('teacher'), literal('student')]),
  darkMode: boolean,
});
export declare type Profile = TypeOf<typeof TProfile>;
