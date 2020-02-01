import { observable, action } from 'mobx';
import { Option, none } from 'fp-ts/lib/Option';
import { Profile } from '../../src/Profile';

class ProfileStore {
  @observable
  public profile: Option<Profile> = none;

  @action
  public setProfile(profile: Option<Profile>): void {
    this.profile = profile;
  }

  public hydrate(profileStore: ProfileStore): void {
    this.setProfile(profileStore.profile);
  }
}

export default ProfileStore;
