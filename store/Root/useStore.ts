import { createContext, useContext } from 'react';
import { Store } from './RootStore';
import StoreError from './StoreError';

const StoreContext = createContext<Store | undefined>(undefined);

function useStore(): Store {
  const store = useContext(StoreContext);
  if (typeof store === 'undefined')
    throw new StoreError('Store is not provided');
  return store;
}

export { StoreContext, useStore };
