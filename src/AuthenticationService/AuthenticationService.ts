import { IncomingMessage } from 'http';
import { pipe } from 'fp-ts/lib/pipeable';
import { some, none, fold as foldO } from 'fp-ts/lib/Option';
import { TaskOption } from 'fp-ts-contrib/lib/TaskOption';
import { of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService, { UnauthorizedError } from '../HttpService';
import CookieService from '../CookieService';
import { TProfile, Profile } from '../Profile';

const AuthenticationService = {
  authenticate,
  hasPermission,
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

export default AuthenticationService;
