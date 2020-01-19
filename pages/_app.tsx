import React from 'react';
import NextApp, { AppContext } from 'next/app';
import { Store } from 'redux';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import ThemeProvider from '../components/app/ThemeProvider';
import initStore from '../store/store';

interface Props {
  store: Store;
}

class App extends NextApp<Props> {
  static async getInitialProps({ Component, ctx }: AppContext) {
    const pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
    return { pageProps };
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
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.remove();
  }
}

export default withRedux(initStore)(App);
