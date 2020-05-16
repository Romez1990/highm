import React, { Children, ReactElement } from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import {
  DocumentContext,
  DocumentInitialProps,
  RenderPageResult,
} from 'next/dist/next-server/lib/utils';
// eslint-disable-next-line import/no-extraneous-dependencies
import { resetServerContext } from 'react-beautiful-dnd';
import { ServerStyleSheets } from '@material-ui/core/styles';
import { StylesProviderProps } from '@material-ui/styles/StylesProvider';
import store from '../Store';
import { lightTheme, darkTheme } from '../Theme';

class Document extends NextDocument {
  public static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const originalRenderPage = ctx.renderPage;
    const sheets = new ServerStyleSheets();
    ctx.renderPage = (): RenderPageResult | Promise<RenderPageResult> =>
      originalRenderPage({
        enhanceApp: App => (props): ReactElement<StylesProviderProps> => {
          resetServerContext();
          return sheets.collect(<App {...props} />);
        },
      });

    const initialProps = await super.getInitialProps(ctx);

    return {
      ...initialProps,
      styles: [
        ...Children.toArray(initialProps.styles),
        sheets.getStyleElement(),
      ],
    };
  }

  public render(): JSX.Element {
    const { darkMode } = store.profileStore;
    const theme = darkMode ? darkTheme : lightTheme;
    return (
      <Html>
        <Head>
          {/* PWA primary color */}
          <meta name="theme-color" content={theme.palette.primary.main} />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"
          />
          <link
            rel="stylesheet"
            href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default Document;
