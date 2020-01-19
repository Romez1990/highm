import React from 'react';
import NextApp, { AppContext } from 'next/app';
import { Store } from 'redux';
import { ThunkDispatch } from 'redux-thunk';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import ThemeProvider from '../components/app/ThemeProvider';
import initStore, { AppState, AppAction } from '../store/store';
import { getProfile, setProfile } from '../store/profile/action';
import Profile from '../types/Profile';

interface Props {
  store: Store;
  profile: Profile;
}

class App extends NextApp<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const state: AppState = ctx.store.getState();
    const dispatch = ctx.store.dispatch as ThunkDispatch<AppState, undefined, AppAction>;

    let profile = state.profile.user;
    if (!profile) {
      profile = await dispatch(getProfile(ctx.req));
    }

    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps, profile };
  }

  render() {
    const { Component, pageProps, store } = this.props;

    return (
      <Provider store={store}>
        <ThemeProvider>
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    );
  }

  componentDidMount() {
    const { store, profile: newProfile } = this.props;

    const state: AppState = store.getState();
    const dispatch = store.dispatch as ThunkDispatch<AppState, undefined, AppAction>;

    let profile = state.profile.user;
    if (!profile && newProfile) {
      dispatch(setProfile(newProfile));
    }

    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.remove();
  }
}

export default withRedux(initStore)(App);
