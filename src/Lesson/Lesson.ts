import {
  type,
  array,
  record,
  string,
  boolean,
  intersection,
  TypeOf,
} from 'io-ts';
import { TTaskBase } from './Task';

export const TLessonBasic = type({
  title: string,
});
export declare type LessonBasic = TypeOf<typeof TLessonBasic>;

export const TLessonBase = intersection([
  TLessonBasic,
  type({
    goals: array(string),
    tasks: record(string, TTaskBase),
  }),
]);
export declare type LessonBase = TypeOf<typeof TLessonBase>;

export const TLessonCheckResults = type({
  results: record(string, boolean),
});
export declare type LessonCheckResults = TypeOf<typeof TLessonCheckResults>;
