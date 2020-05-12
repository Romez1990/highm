import React, { ReactNode } from 'react';
import registrationStore, {
  RegistrationStoreContext,
} from '../../store/Registration';

interface Props {
  children: ReactNode;
}

function StoreProvider({ children }: Props): JSX.Element {
  return (
    <RegistrationStoreContext.Provider value={registrationStore}>
      {children}
    </RegistrationStoreContext.Provider>
  );
}

export default StoreProvider;
