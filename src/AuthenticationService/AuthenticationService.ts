import { IncomingMessage } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none, fold as foldO } from 'fp-ts/lib/Option';
import { of, map } from 'fp-ts/lib/Task';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import {
  fold,
  TaskEither,
  chain,
  mapLeft,
  rightTask,
} from 'fp-ts/lib/TaskEither';
import { type, string } from 'io-ts';
import CookieService from '../CookieService';
import HttpService, { HttpError, UnauthorizedError } from '../HttpService';
import { LoginError, AuthenticationAfterLoggingInError } from './Errors';
import { TProfile, Profile } from '../Profile';

const AuthenticationService = {
  authenticate,
  hasPermission,
  login,
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
          map(profile =>
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

export default AuthenticationService;
