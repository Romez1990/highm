import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import LoginError from '../LoginError';

class WrongCredentialsError extends LoginError {
  public static identifySubError(err: HttpError): Option<LoginError> {
    const TResponseType = type({
      nonFieldErrors: tuple([
        literal('Unable to log in with provided credentials.'),
      ]),
    });

    return pipe(
      check(TResponseType, err.requestError.response?.data),
      fold(
        () => none,
        () =>
          some(
            new WrongCredentialsError('Cannot login with wrong credentials'),
          ),
      ),
    );
  }
}

LoginError.addSubclass(WrongCredentialsError);

export default WrongCredentialsError;
