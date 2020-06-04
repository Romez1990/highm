import { BaseRootStore } from '../BaseRoot';
import ProfileStore from '../Profile';

class RootStore extends BaseRootStore {
  public profileStore: ProfileStore = new ProfileStore();

  protected internalHydrate(store: RootStore): void {
    this.profileStore.hydrate(store.profileStore);
  }
}

export default new RootStore();

export { RootStore as Store };
