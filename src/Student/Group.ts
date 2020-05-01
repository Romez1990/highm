import { type, array, string, number, TypeOf } from 'io-ts';
import { TStudent } from './Student';
import RegexError from '../Error/RegexError';

// [\u0410-\u044f] is Russian alphabet
export const groupNameRegexPartial = /^(?:[1-4]|(?:[1-4][\u0410-\u044f]{1,4})|(?:[1-4][\u0410-\u044f]{2,4}-)|[1-4][\u0410-\u044f]{2,4}-\d{1,2}\u0430?|[1-4][\u0410-\u044f]{2,4}-\d{1,2}\u0430?\.|[1-4][\u0410-\u044f]{2,4}-\d{1,2}\u0430?\.\d{1,2})?$/;

export const groupNameRegex = /^(?<grade>[1-4])(?<specialty>[\u0410-\u044f]{2,4})-(?<number>\d{1,2})(?<a>\u0430?)\.(?<admissionYear>\d{2})$/;

export function groupCompare(a: GroupBasic, b: GroupBasic): number {
  const aMatch = a.name.match(groupNameRegex);
  const bMatch = b.name.match(groupNameRegex);

  if (aMatch === null && bMatch === null) {
    return a.name.localeCompare(b.name);
  }
  if (aMatch === null) {
    return -1;
  }
  if (bMatch === null) {
    return 1;
  }

  if (
    typeof aMatch.groups === 'undefined' ||
    typeof bMatch.groups === 'undefined'
  ) {
    throw new RegexError('Groups are not defined');
  }

  const aGrade = parseInt(aMatch.groups.grade, 10);
  const aNumber = parseInt(aMatch.groups.number, 10);
  const aA = aMatch.groups.a === 'a';

  const bGrade = parseInt(bMatch.groups.grade, 10);
  const bNumber = parseInt(bMatch.groups.number, 10);
  const bA = bMatch.groups.a === 'a';

  if (aGrade > bGrade || aNumber > bNumber || (aA && !bA)) return 1;
  if (aGrade < bGrade || aNumber < bNumber || (!aA && bA)) return -1;
  return 0;
}

export const TGroupBasic = type({
  name: string,
  numberOfStudents: number,
});
export declare type GroupBasic = TypeOf<typeof TGroupBasic>;

export const TGroup = type({
  name: string,
  students: array(TStudent),
});
export declare type Group = TypeOf<typeof TGroup>;
