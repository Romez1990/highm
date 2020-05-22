import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import RegistrationError from '../RegistrationError';

class NamesMismatchError extends RegistrationError {
  public static identifySubError(err: HttpError): Option<RegistrationError> {
    const TResponse = type({
      names: tuple([
        literal('Names do not match names from registration code.'),
      ]),
    });

    return pipe(
      check(TResponse, err.response),
      fold(
        () => none,
        () =>
          some(
            new NamesMismatchError(
              'Names do not match names from registration code',
            ),
          ),
      ),
    );
  }
}

RegistrationError.addSubclass(NamesMismatchError);

export default NamesMismatchError;
