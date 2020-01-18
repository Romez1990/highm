import React from 'react';
import NextApp from 'next/app';
import ThemeProvider from '../components/app/ThemeProvider';

class App extends NextApp {
  render() {
    const { Component, pageProps } = this.props;

    return (
      <ThemeProvider>
        <Component {...pageProps} />
      </ThemeProvider>
    );
  }

  componentDidMount() {
    const jssStyles = document.querySelector('#jss-server-side');
    jssStyles?.remove();
  }
}

export default App;
