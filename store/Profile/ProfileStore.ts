import { IncomingMessage } from 'http';
import { observable, action } from 'mobx';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, some, none, fold as foldO } from 'fp-ts/lib/Option';
import { Task, map, of } from 'fp-ts/lib/Task';
import { fold } from 'fp-ts/lib/TaskEither';
import HttpService from '../../src/HttpService';
import AuthenticationService from '../../src/AuthenticationService';
import CookieService from '../../src/CookieService';
import { TProfile, Profile } from '../../src/Profile';

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
      map(profile => this.setProfile(profile)),
    );
  }

  @observable
  public darkMode = false;

  @action
  public setDarkTheme(darkMode: boolean): void {
    this.darkMode = darkMode;
  }

  public getDarkTheme(req?: IncomingMessage): void {
    const defaultValue = process.env.NODE_ENV === 'development';
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
