import {
  type,
  array,
  record,
  number,
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

export const TTaskResult = type({
  points: number,
  maxPoints: number,
});
export declare type TaskResult = TypeOf<typeof TTaskResult>;

export const TLessonResultsBase = type({
  grade: number,
  points: number,
  maxPoints: number,
});

export const TLessonResults = intersection([
  TLessonResultsBase,
  type({
    taskResults: array(TTaskResult),
  }),
]);
export declare type LessonResults = TypeOf<typeof TLessonResults>;
