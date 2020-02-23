import { type, string, TypeOf } from 'io-ts';

export const TLessonBasic = type({
  title: string,
});
export declare type LessonBasic = TypeOf<typeof TLessonBasic>;
