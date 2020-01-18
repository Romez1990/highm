import React, { Fragment, ReactNode } from 'react';
import Head from 'next/head';

interface Props {
  title?: string;
  children: ReactNode;
}

function BaseLayout({ title, children }: Props) {
  return (
    <Fragment>
      <Head>
        <title>HighM{title && ` | ${title}`}</title>
      </Head>

      {children}
    </Fragment>
  );
}

export default BaseLayout;
