import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import RegistrationError from '../RegistrationError';

class WrongRegistrationCodeError extends RegistrationError {
  public static identifySubError(err: HttpError): Option<RegistrationError> {
    const TResponse = type({
      registrationCode: tuple([literal('Wrong registration code.')]),
    });

    return pipe(
      check(TResponse, err.requestError.response?.data),
      fold(
        () => none,
        () =>
          some(new WrongRegistrationCodeError('Registration code not found')),
      ),
    );
  }
}

RegistrationError.addSubclass(WrongRegistrationCodeError);

export default WrongRegistrationCodeError;
