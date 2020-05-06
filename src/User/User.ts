import {
  type,
  number,
  string,
  literal,
  union,
  intersection,
  TypeOf,
} from 'io-ts';

export const TUserBase = type({
  firstName: string,
  lastName: string,
});
export declare type UserBase = TypeOf<typeof TUserBase>;

export const TRegisteredUser = intersection([
  TUserBase,
  type({
    id: number,
    registered: literal(true),
  }),
]);
export declare type RegisteredUser = TypeOf<typeof TRegisteredUser>;

export const TUnregisteredUser = intersection([
  TUserBase,
  type({
    code: string,
    registered: literal(false),
  }),
]);
export declare type TUnregisteredUser = TypeOf<typeof TUnregisteredUser>;

export const TUnregisteredUserNew = TUserBase;
export declare type UnregisteredUserNew = TypeOf<typeof TUnregisteredUserNew>;

export const TUser = union([TRegisteredUser, TUnregisteredUser]);
export declare type User = TypeOf<typeof TUser>;
