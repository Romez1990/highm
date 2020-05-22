import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import RegistrationError from '../RegistrationError';

class EmailTakenError extends RegistrationError {
  public static identifySubError(err: HttpError): Option<RegistrationError> {
    const TResponse = type({
      email: tuple([
        literal('A user is already registered with this email address.'),
      ]),
    });

    return pipe(
      check(TResponse, err.response),
      fold(
        () => none,
        () =>
          some(
            new EmailTakenError(
              'A user is already registered with this email address',
            ),
          ),
      ),
    );
  }
}

RegistrationError.addSubclass(EmailTakenError);

export default EmailTakenError;
