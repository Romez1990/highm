import { type, string, boolean, literal, union, TypeOf } from 'io-ts';

export const TProfileType = union([
  literal('admin'),
  literal('teacher'),
  literal('student'),
]);
export declare type ProfileType = TypeOf<typeof TProfileType>;

export const TProfile = type({
  firstName: string,
  lastName: string,
  email: string,
  type: TProfileType,
  darkMode: boolean,
});
export declare type Profile = TypeOf<typeof TProfile>;
