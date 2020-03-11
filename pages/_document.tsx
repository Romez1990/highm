import React from 'react';
import NextDocument, { Html, Head, Main, NextScript } from 'next/document';
import {
  DocumentContext,
  DocumentInitialProps,
} from 'next/dist/next-server/lib/utils';

class Document extends NextDocument {
  public static async getInitialProps(
    ctx: DocumentContext,
  ): Promise<DocumentInitialProps> {
    const initialProps = await super.getInitialProps(ctx);

    return {
      ...initialProps,
    };
  }

  public render(): JSX.Element {
    return (
      <Html>
        <Head>
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0, minimum-scale=1.0, shrink-to-fit=no"
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
