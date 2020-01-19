import { Store } from 'redux';

declare module 'next' {
  interface NextPageContext {
    store: Store;
  }
}
