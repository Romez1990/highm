import { IncomingMessage } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { Task, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import { array } from 'io-ts';
import HttpService from '../../HttpService';
import { TGroupBasic, GroupBasic } from '../Group';

function fetchGroups(req: IncomingMessage | undefined): Task<GroupBasic[]> {
  const returnType = array(TGroupBasic);
  return pipe(
    HttpService.get('/group/', returnType, req),
    fold(
      err => {
        throw err;
      },
      groups => of(groups),
    ),
  );
}

export default fetchGroups;
