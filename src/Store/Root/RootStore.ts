import ProfileStore from '../Profile';

class RootStore {
  public profileStore: ProfileStore = new ProfileStore();

  public hydrate(store: RootStore): void {
    this.profileStore.hydrate(store.profileStore);
  }
}

export default new RootStore();

export { RootStore as Store };
