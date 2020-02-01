import { IncomingMessage } from 'http';
import { observable, action } from 'mobx';
import { pipe } from 'fp-ts/lib/pipeable';
import { Option, none } from 'fp-ts/lib/Option';
import { Task, map } from 'fp-ts/lib/Task';
import AuthenticationService from '../../src/AuthenticationService';
import { Profile } from '../../src/Profile';

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

  public hydrate(profileStore: ProfileStore): void {
    this.setProfile(profileStore.profile);
  }
}

export default ProfileStore;
