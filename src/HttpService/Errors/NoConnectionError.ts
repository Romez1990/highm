import { Option, some, none } from 'fp-ts/lib/Option';
import { RegexError } from '../../Error';
import NetworkError, { RequestError } from './NetworkError';

class NoConnectionError extends NetworkError {
  public constructor(host: string, err: RequestError) {
    super(`No connection to host ${host}`, err);
  }

  public static identifySubError(err: RequestError): Option<NoConnectionError> {
    const match = err.message.match(/^connect ECONNREFUSED (?<host>.+)$/);
    if (match === null) return none;
    if (typeof match.groups === 'undefined')
      throw new RegexError('Groups are not defined');

    const { host } = match.groups;
    return some(new NoConnectionError(host, err));
  }
}

NetworkError.addSubclass(NoConnectionError);

export default NoConnectionError;
