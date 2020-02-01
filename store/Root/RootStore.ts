class RootStore {
  // eslint-disable-next-line no-useless-constructor,@typescript-eslint/no-empty-function
  public constructor() {}

  // eslint-disable-next-line class-methods-use-this,@typescript-eslint/no-empty-function,@typescript-eslint/no-unused-vars
  public hydrate(store: RootStore): void {}
}

export default new RootStore();

export { RootStore as Store };
