import React, { ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';

interface AppWrapperProps {
  children: ReactNode;
}

function AppWrapper({ children }: AppWrapperProps): JSX.Element {
  return (
    <StoreProvider>
      <ThemeProvider>{children}</ThemeProvider>
    </StoreProvider>
  );
}

export default AppWrapper;
