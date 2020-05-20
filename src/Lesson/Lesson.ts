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

export const TLessonBasicBase = type({
  title: string,
});

export const TLessonBasic = intersection([
  TLessonBasicBase,
  type({
    passed: boolean,
  }),
]);
export declare type LessonBasic = TypeOf<typeof TLessonBasic>;

export const TLessonBase = intersection([
  TLessonBasicBase,
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
