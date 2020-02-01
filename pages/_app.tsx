import React, { useEffect, useState } from 'react';
import { AppContext } from 'next/app';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import { flow } from 'fp-ts/lib/function';
import StoreProvider from '../components/App/StoreProvider';
import ThemeProvider from '../components/App/ThemeProvider';
import store, { Store } from '../store';

interface InitialProps {
  pageProps: object;
  store: Store;
}

interface Props extends InitialProps {
  Component: NextComponentType;
}

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<InitialProps> => {
  const pageProps =
    typeof Component.getInitialProps !== 'undefined'
      ? await Component.getInitialProps(ctx)
      : {};

  return {
    pageProps,
    store,
  };
};

function App({
  Component: Page,
  pageProps,
  store: preloadedState,
}: Props): JSX.Element {
  useEffect(flow(load, removeStyles), []);

  const [first, setFirst] = useState(true);

  if (first) {
    store.hydrate(preloadedState);
  }

  function load(): void {
    setFirst(false);
  }

  function removeStyles(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    // eslint-disable-next-line no-unused-expressions
    jssStyles?.remove();
  }

  return (
    <StoreProvider>
      <ThemeProvider>
        <Page {...pageProps} />
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
