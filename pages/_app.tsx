import React, { useEffect, useState } from 'react';
import { AppContext } from 'next/app';
import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import { flow } from 'fp-ts/lib/function';
import { fromNullable, isNone } from 'fp-ts/lib/Option';
import StoreProvider from '../components/App/StoreProvider';
import ThemeProvider from '../components/App/ThemeProvider';
import store, { Store } from '../store';
import AuthenticationService, {
  Permission,
} from '../src/AuthenticationService';
import { RedirectionError, redirectToLogin } from '../src/Redirect';
import ErrorPage from './_error';

interface InitialProps {
  pageProps: object;
  store: Store;
  hasPermission: boolean;
}

interface Props extends InitialProps {
  Component: NextComponentType;
}

export declare type ComponentType<P> = NextComponentType<
  NextPageContext,
  P,
  P
> & {
  permission?: Permission;
};

App.getInitialProps = async ({
  Component,
  ctx,
}: AppContext): Promise<InitialProps> => {
  const { req, res } = ctx;

  if (!process.browser) {
    await store.profileStore.authenticate(req)();
  }

  const TypedComponent = Component as ComponentType<object>;

  const { permission } = TypedComponent;
  const { profile } = store.profileStore;
  const hasPermission = AuthenticationService.hasPermission(
    profile,
    fromNullable(permission),
  );

  const isProfileNone = isNone(profile);

  if (!hasPermission && isProfileNone) {
    if (process.browser || typeof req === 'undefined')
      throw new RedirectionError(
        'Redirecting from the browser is unacceptable',
      );
    await redirectToLogin(res, req.url);
  }

  const pageProps =
    hasPermission && typeof Component.getInitialProps !== 'undefined'
      ? await Component.getInitialProps(ctx)
      : {};

  return {
    pageProps,
    store,
    hasPermission,
  };
};

function App({
  Component: Page,
  pageProps,
  store: preloadedState,
  hasPermission,
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

  if (!hasPermission) {
    return (
      <StoreProvider>
        <ThemeProvider>
          <ErrorPage statusCode={404} />
        </ThemeProvider>
      </StoreProvider>
    );
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
