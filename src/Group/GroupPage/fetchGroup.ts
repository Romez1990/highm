import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { pipe } from 'fp-ts/lib/pipeable';
import { some, none } from 'fp-ts/lib/Option';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService, { NotFoundError } from '../../HttpService';
import { TGroup, Group } from '../Group';

function getGroup(query: ParsedUrlQuery): string {
  const { group } = query;
  if (typeof group !== 'string') {
    throw new Error('Group must me string');
  }
  return group;
}

function fetchGroup(group: string, req?: IncomingMessage): TaskOption<Group> {
  return pipe(
    HttpService.get(`/group/${encodeURIComponent(group)}/`, TGroup, req),
    fold(
      err => {
        if (!(err instanceof NotFoundError)) throw err;
        return of(none);
      },
      group_ => of(some(group_)),
    ),
  );
}

export { getGroup, fetchGroup };
