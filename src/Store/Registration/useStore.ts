import { createContext, useContext } from 'react';
import { RegistrationStore } from './RegistrationStore';
import StoreError from '../Root/StoreError';

const RegistrationStoreContext = createContext<RegistrationStore | undefined>(
  undefined,
);

function useRegistrationStore(): RegistrationStore {
  const store = useContext(RegistrationStoreContext);
  if (typeof store === 'undefined')
    throw new StoreError('Registration Store is not provided');
  return store;
}

export { RegistrationStoreContext, useRegistrationStore };
