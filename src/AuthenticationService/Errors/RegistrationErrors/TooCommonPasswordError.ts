import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import RegistrationError from '../RegistrationError';

class TooCommonPasswordError extends RegistrationError {
  public static identifySubError(err: HttpError): Option<RegistrationError> {
    const TResponse = type({
      password: tuple([literal('This password is too common.')]),
    });

    return pipe(
      check(TResponse, err.response),
      fold(
        () => none,
        () => some(new TooCommonPasswordError('This password is too common')),
      ),
    );
  }
}

RegistrationError.addSubclass(TooCommonPasswordError);

export default TooCommonPasswordError;
