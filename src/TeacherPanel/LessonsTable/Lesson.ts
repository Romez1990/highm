import { type, string, TypeOf } from 'io-ts';

export const TLesson = type({
  title: string,
});
export declare type Lesson = TypeOf<typeof TLesson>;
