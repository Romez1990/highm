import { IncomingMessage } from 'http';
import { ParsedUrlQuery } from 'querystring';
import { pipe } from 'fp-ts/lib/pipeable';
import { some, none } from 'fp-ts/lib/Option';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService, { NotFoundError } from '../HttpService';
import { TGroup, Group } from './Group';

function fetchGroup(
  { name }: ParsedUrlQuery,
  req?: IncomingMessage,
): TaskOption<Group> {
  if (typeof name !== 'string') return of(none);
  return pipe(
    HttpService.get(`/group/${encodeURIComponent(name)}/`, TGroup, req),
    fold(
      err => {
        if (!(err instanceof NotFoundError)) throw err;
        return of(none);
      },
      group => of(some(group)),
    ),
  );
}

export default fetchGroup;
