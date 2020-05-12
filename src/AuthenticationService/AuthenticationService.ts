import { IncomingMessage, ServerResponse } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none, fold as foldO } from 'fp-ts/lib/Option';
import { Task, of, map as mapT } from 'fp-ts/lib/Task';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import {
  fold,
  TaskEither,
  chain,
  map,
  mapLeft,
  rightTask,
} from 'fp-ts/lib/TaskEither';
import { type, literal, string } from 'io-ts';
import CookieService from '../CookieService';
import HttpService, { HttpError, UnauthorizedError } from '../HttpService';
import {
  LoginError,
  AuthenticationAfterLoggingInError,
  RegistrationError,
  EmailVerificationError,
} from './Errors';
import { TProfile, Profile } from '../Profile';

const AuthenticationService = {
  authenticate,
  hasPermission,
  login,
  logout,
  registrationCodeCheck,
  register,
  emailVerificationKeyCheck,
  verifyEmail,
};

function authenticate(req: IncomingMessage | undefined): TaskOption<Profile>;
function authenticate(token: string): TaskOption<Profile>;

function authenticate(
  auth: IncomingMessage | string | undefined,
): TaskOption<Profile> {
  return pipe(
    typeof auth !== 'string' ? CookieService.get('token', auth) : some(auth),
    foldO(
      () => of(none),
      token =>
        pipe(
          HttpService.get('/auth/profile/', TProfile, token),
          fold(
            err => {
              if (err instanceof UnauthorizedError) return of(none);
              throw err;
            },
            profile => of(some(profile)),
          ),
        ),
    ),
  );
}

export declare type Permission =
  | 'IsAuthenticated'
  | 'IsStudent'
  | 'IsTeacher'
  | 'IsAdmin';

function hasPermission(
  profile: Option<Profile>,
  permission: Option<Permission>,
): boolean {
  return pipe(
    permission,
    foldO(
      () => true,
      permission_ =>
        pipe(
          profile,
          foldO(
            () => false,
            ({ type: type_ }) =>
              type_ === 'admin' ||
              permission_ === 'IsAuthenticated' ||
              (type_ === 'teacher' && permission_ === 'IsTeacher') ||
              (type_ === 'student' && permission_ === 'IsStudent'),
          ),
        ),
    ),
  );
}

export interface LoginParams {
  email: string;
  password: string;
}

function login(data: LoginParams): TaskEither<LoginError, Profile> {
  const TLoginResponse = type({
    token: string,
  });

  return pipe(
    HttpService.post('/auth/login/', TLoginResponse, data, false),
    mapLeft(err => {
      if (!(err instanceof HttpError)) throw err;
      return LoginError.identify(err);
    }),
    chain(
      ({ token }): TaskEither<LoginError, Profile> => {
        CookieService.set('token', token);
        return pipe(
          authenticate(token),
          mapT(profile =>
            pipe(
              profile,
              foldO(
                () => {
                  throw new AuthenticationAfterLoggingInError(
                    'Authentication failed after logging in',
                  );
                },
                profile_ => profile_,
              ),
            ),
          ),
          rightTask,
        );
      },
    ),
  );
}

function logout(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
): Task<void> {
  const TLogoutResponse = type({
    detail: literal('Successfully logged out.'),
  });

  return pipe(
    HttpService.post('/auth/logout/', TLogoutResponse, undefined, req),
    fold(
      err => {
        throw err;
      },
      () => of(CookieService.remove('token', res)),
    ),
  );
}

export interface RegistrationCodeCheckParams {
  registrationCode: string;
  firstName: string;
  lastName: string;
}

function registrationCodeCheck(
  data: RegistrationCodeCheckParams,
): TaskEither<RegistrationError[], void> {
  const TResponse = type({
    detail: literal('Registration code is valid.'),
  });

  return pipe(
    HttpService.post('/auth/registration-code-check/', TResponse, data, false),
    mapLeft(err => {
      if (!(err instanceof HttpError)) throw err;
      return RegistrationError.identify(err);
    }),
    map(() => undefined),
  );
}

export interface RegisterParams extends RegistrationCodeCheckParams {
  email: string;
  password: string;
}

function register(data: RegisterParams): TaskEither<RegistrationError[], void> {
  const TResponse = type({
    detail: literal('Verification e-mail sent.'),
  });

  return pipe(
    HttpService.post('/auth/register/', TResponse, data),
    mapLeft(err => {
      if (!(err instanceof HttpError)) throw err;
      return RegistrationError.identify(err);
    }),
    map(() => undefined),
  );
}

function emailVerificationKeyCheck(
  key: string,
): TaskEither<EmailVerificationError, void> {
  const TResponse = type({
    detail: literal('Verification key is valid.'),
  });

  return pipe(
    HttpService.post(
      '/auth/email-verification-key-check/',
      TResponse,
      { key },
      false,
    ),
    mapLeft(err => {
      if (!(err instanceof HttpError)) throw err;
      return EmailVerificationError.identify(err);
    }),
    map(() => undefined),
  );
}

function verifyEmail(key: string): TaskEither<EmailVerificationError, void> {
  const TResponse = type({
    detail: literal('Email verified.'),
  });

  return pipe(
    HttpService.post('/auth/verify-email/', TResponse, { key }, false),
    mapLeft(err => {
      if (!(err instanceof HttpError)) throw err;
      return EmailVerificationError.identify(err);
    }),
    map(() => undefined),
  );
}

export default AuthenticationService;
