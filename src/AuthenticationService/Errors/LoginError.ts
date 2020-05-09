import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { ErrorIdentifier, identifyError } from '../../Error';
import AuthenticationServiceError from './AuthenticationServiceError';
import { HttpError } from '../../HttpService';

interface LoginErrorSubclass {
  identifySubError: ErrorIdentifier<HttpError, LoginError>;
}

abstract class LoginError extends AuthenticationServiceError {
  public static identify(err: HttpError): LoginError {
    return pipe(
      LoginError.subclasses,
      map(subclass => subclass.identifySubError),
      identifyError(err),
    );
  }

  protected static subclasses: LoginErrorSubclass[] = [];

  public static addSubclass(subclass: LoginErrorSubclass): void {
    this.subclasses.push(subclass);
  }
}

export default LoginError;
