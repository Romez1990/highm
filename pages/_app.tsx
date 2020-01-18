import React, { useEffect } from 'react';
import { AppContext } from 'next/app';
import { NextComponentType } from 'next/dist/next-server/lib/utils';
import ThemeProvider from '../components/App/ThemeProvider';

interface InitialProps {
  pageProps: object;
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
  };
};

function App({ Component: Page, pageProps }: Props): JSX.Element {
  useEffect(removeStyles, []);

  function removeStyles(): void {
    const jssStyles = document.querySelector('#jss-server-side');
    // eslint-disable-next-line no-unused-expressions
    jssStyles?.remove();
  }

  return (
    <ThemeProvider>
      <Page {...pageProps} />
    </ThemeProvider>
  );
}

export default App;
