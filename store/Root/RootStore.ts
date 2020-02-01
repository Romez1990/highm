import ProfileStore from '../Profile';

class RootStore {
  public profileStore: ProfileStore;

  public constructor() {
    this.profileStore = new ProfileStore();
  }

  public hydrate(store: RootStore): void {
    this.profileStore.hydrate(store.profileStore);
  }
}

export default new RootStore();

export { RootStore as Store };
