import { pipe } from 'fp-ts/lib/pipeable';
import { map } from 'fp-ts/lib/Array';
import { identifyErrors, ErrorIdentifier } from '../../Error';
import AuthenticationServiceError from './AuthenticationServiceError';
import { HttpError } from '../../HttpService';

interface RegistrationErrorSubclass {
  identifySubError: ErrorIdentifier<HttpError, RegistrationError>;
}

abstract class RegistrationError extends AuthenticationServiceError {
  public static identify(err: HttpError): RegistrationError[] {
    return pipe(
      RegistrationError.subclasses,
      map(subclass => subclass.identifySubError),
      identifyErrors(err),
    );
  }

  protected static subclasses: RegistrationErrorSubclass[] = [];

  public static addSubclass(subclass: RegistrationErrorSubclass): void {
    this.subclasses.push(subclass);
  }
}

export default RegistrationError;
