import React, { Fragment, ReactNode } from 'react';
import StoreProvider from './StoreProvider';
import ThemeProvider from './ThemeProvider';
import HttpsRedirect from './HttpsRedirect';

interface AppWrapperProps {
  children: ReactNode;
}

function AppWrapper({ children }: AppWrapperProps): JSX.Element {
  return (
    <Fragment>
      <StoreProvider>
        <ThemeProvider>{children}</ThemeProvider>
      </StoreProvider>
      <HttpsRedirect />
    </Fragment>
  );
}

export default AppWrapper;
