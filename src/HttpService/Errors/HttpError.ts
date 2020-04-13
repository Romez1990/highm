import { Option, some, none } from 'fp-ts/lib/Option';
import { RegexError } from '../../Error';
import NetworkError, { RequestError } from './NetworkError';

interface HttpErrorSubclassConstructor {
  new (requestError: RequestError): HttpError;
  statusCode: number;
}

abstract class HttpError extends NetworkError {
  protected constructor(public readonly statusCode: number, err: RequestError) {
    super(`Request failed with status code ${statusCode}`, err);
  }

  public static identifySubError(err: RequestError): Option<HttpError> {
    const match = err.message.match(
      /^Request failed with status code (?<code>\d{3})$/,
    );
    if (match === null) return none;
    if (typeof match.groups === 'undefined')
      throw new RegexError('Groups are not defined');

    const { code } = match.groups;
    const HttpErrorSubclass = HttpError.httpErrorSubclasses[code];
    return some(new HttpErrorSubclass(err));
  }

  protected static httpErrorSubclasses: Record<
    string,
    HttpErrorSubclassConstructor
  > = {};

  public static addHttpErrorSubclass(
    subclass: HttpErrorSubclassConstructor,
  ): void {
    const statusCode = subclass.statusCode.toString();
    this.httpErrorSubclasses[statusCode] = subclass;
  }
}

NetworkError.addSubclass(HttpError);

export default HttpError;
