import React, { Fragment, ReactNode } from 'react';
import Head from 'next/head';

export interface LayoutProps {
  title?: string;
  children: ReactNode;
}

function BaseLayout({
  title: titleAddition,
  children,
}: LayoutProps): JSX.Element {
  let title = 'HighM';
  if (typeof titleAddition !== 'undefined') title += ` | ${titleAddition}`;

  return (
    <Fragment>
      <Head>
        <title>{title}</title>
      </Head>
      {children}
    </Fragment>
  );
}

export default BaseLayout;
