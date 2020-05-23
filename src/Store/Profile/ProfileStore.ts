import { IncomingMessage, ServerResponse } from 'http';
import { observable, action } from 'mobx';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none, fold as foldO } from 'fp-ts/lib/Option';
import { Task, map as mapT, of } from 'fp-ts/lib/Task';
import { TaskEither, map, fold } from 'fp-ts/lib/TaskEither';
import HttpService from '../../HttpService';
import AuthenticationService, {
  LoginError,
  LoginParams,
} from '../../AuthenticationService';
import CookieService from '../../CookieService';
import { dev } from '../../Env';
import { TProfile, Profile } from '../../Profile';

class ProfileStore {
  @observable
  public profile: Option<Profile> = none;

  @action
  public setProfile(profile: Option<Profile>): void {
    this.profile = profile;
  }

  public authenticate(req: IncomingMessage | undefined): Task<void> {
    return pipe(
      AuthenticationService.authenticate(req),
      mapT(profile => this.setProfile(profile)),
    );
  }

  public login(data: LoginParams): TaskEither<LoginError, Profile> {
    return pipe(
      AuthenticationService.login(data),
      map(profile => {
        this.setProfile(some(profile));
        this.getDarkTheme();
        return profile;
      }),
    );
  }

  public logout(
    req: IncomingMessage | undefined,
    res: ServerResponse | undefined,
  ): Task<void> {
    const { profile } = this;
    return pipe(
      profile,
      foldO(
        () => of(undefined),
        () => {
          this.setProfile(none);
          return AuthenticationService.logout(req, res);
        },
      ),
      mapT(() => {
        this.getDarkTheme();
      }),
    );
  }

  @observable
  public darkMode = false;

  @action
  public setDarkTheme(darkMode: boolean): void {
    this.darkMode = darkMode;
  }

  public getDarkTheme(req?: IncomingMessage): void {
    const defaultValue = dev;
    this.setDarkTheme(
      pipe(
        this.profile,
        foldO(
          () =>
            pipe(
              CookieService.get('darkMode', req),
              foldO(
                () => defaultValue,
                darkMode => darkMode === 'true',
              ),
            ),
          profile => profile.darkMode,
        ),
      ),
    );
  }

  public saveDarkTheme(darkMode: boolean): Task<void> {
    this.setDarkTheme(darkMode);
    return pipe(
      this.profile,
      foldO(
        () => of(CookieService.set('darkMode', darkMode.toString())),
        () =>
          pipe(
            HttpService.patch('/auth/profile/', TProfile, { darkMode }),
            fold(
              err => {
                throw err;
              },
              profile => of(this.setProfile(some(profile))),
            ),
          ),
      ),
    );
  }

  public hydrate(profileStore: ProfileStore): void {
    this.setProfile(profileStore.profile);
    this.setDarkTheme(profileStore.darkMode);
  }
}

export default ProfileStore;
