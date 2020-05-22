import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none } from 'fp-ts/lib/Option';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../../HttpService';
import { check } from '../../../TypeCheck';
import LoginError from '../LoginError';

class EmailNotVerifiedError extends LoginError {
  public static identifySubError(err: HttpError): Option<LoginError> {
    const TResponseType = type({
      nonFieldErrors: tuple([literal('E-mail is not verified.')]),
    });

    return pipe(
      check(TResponseType, err.response),
      fold(
        () => none,
        () => some(new EmailNotVerifiedError('E-mail is not verified')),
      ),
    );
  }
}

LoginError.addSubclass(EmailNotVerifiedError);

export default EmailNotVerifiedError;
