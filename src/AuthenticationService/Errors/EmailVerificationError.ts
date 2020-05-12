import { pipe } from 'fp-ts/lib/pipeable';
import { fold } from 'fp-ts/lib/Either';
import { type, literal, tuple } from 'io-ts';
import { HttpError } from '../../HttpService';
import { check } from '../../TypeCheck';
import AuthenticationServiceError from './AuthenticationServiceError';

class EmailVerificationError extends AuthenticationServiceError {
  public static identify(err: HttpError): EmailVerificationError {
    const TResponseType = type({
      key: tuple([literal('Invalid verification key.')]),
    });

    return pipe(
      check(TResponseType, err.requestError.response?.data),
      fold(
        () => {
          throw err;
        },
        () => new EmailVerificationError('Invalid verification key'),
      ),
    );
  }
}

export default EmailVerificationError;
