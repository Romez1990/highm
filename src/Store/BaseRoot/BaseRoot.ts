abstract class BaseRootStore {
  private hydrated = false;

  public hydrate(store: BaseRootStore): void {
    if (this.hydrated) return;
    this.internalHydrate(store);
    this.hydrated = true;
  }

  protected abstract internalHydrate(store: BaseRootStore): void;
}

export default BaseRootStore;
