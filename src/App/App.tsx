import { IncomingMessage, ServerResponse } from 'http';
import React, { useEffect, useState } from 'react';
import { AppContext } from 'next/app';
import {
  NextComponentType,
  NextPageContext,
} from 'next/dist/next-server/lib/utils';
import { flow } from 'fp-ts/lib/function';
import { Option, fromNullable, isNone } from 'fp-ts/lib/Option';
import AppWrapper from './AppWrapper';
import store, { Store } from '../Store';
import AuthenticationService, { Permission } from '../AuthenticationService';
import { RedirectionError, redirectToLogin } from '../Redirect';
import { Page404 } from '../ErrorPage';
import { Profile } from '../Profile';

interface InitialProps {
  pageProps: object;
  store: Store;
  hasPermission: boolean;
}

interface Props extends InitialProps {
  Component: NextComponentType;
}

type Context = Omit<AppContext, 'Component'> & {
  Component: ComponentType;
};

export declare type ComponentType = NextComponentType & {
  permission?: Permission;
};

App.getInitialProps = async ({
  Component,
  ctx,
}: Context): Promise<InitialProps> => {
  const { req, res } = ctx;

  await initStore(req);
  const { profile } = store.profileStore;
  const hasPermission = hasProfilePermission(Component, profile);
  await redirectToLoginIfNecessary(req, res, hasPermission, profile);
  const pageProps = await getPageProps(Component, ctx, hasPermission);

  return {
    pageProps,
    store,
    hasPermission,
  };
};

async function initStore(req: IncomingMessage | undefined): Promise<void> {
  if (!process.browser) {
    await store.profileStore.authenticate(req)();
    store.profileStore.getDarkTheme(req);
  }
}

function hasProfilePermission(
  Component: ComponentType,
  profile: Option<Profile>,
): boolean {
  const { permission } = Component;
  return AuthenticationService.hasPermission(profile, fromNullable(permission));
}

async function redirectToLoginIfNecessary(
  req: IncomingMessage | undefined,
  res: ServerResponse | undefined,
  hasPermission: boolean,
  profile: Option<Profile>,
): Promise<void> {
  const isProfileNone = isNone(profile);
  if (!hasPermission && isProfileNone) {
    if (process.browser || typeof req === 'undefined')
      throw new RedirectionError(
        'Redirecting from the browser is unacceptable',
      );
    await redirectToLogin(res, req.url);
  }
}

function getPageProps(
  Component: ComponentType,
  ctx: NextPageContext,
  shouldLoadPage: boolean,
): object | Promise<object> {
  return shouldLoadPage && typeof Component.getInitialProps !== 'undefined'
    ? Component.getInitialProps(ctx)
    : {};
}

function App({
  Component: Page,
  pageProps,
  store: preloadedState,
  hasPermission,
}: Props): JSX.Element {
  useEffect(flow(load, removeStyles), []);

  const [firstRender, setFirstRender] = useState(true);

  if (firstRender) {
    store.hydrate(preloadedState);
  }

  function load(): void {
    setFirstRender(false);
  }

  function removeStyles(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    // eslint-disable-next-line no-unused-expressions
    jssStyles?.remove();
  }

  if (!hasPermission) {
    return (
      <AppWrapper>
        <Page404 />
      </AppWrapper>
    );
  }

  return (
    <AppWrapper>
      <Page {...pageProps} />
    </AppWrapper>
  );
}

export default App;
