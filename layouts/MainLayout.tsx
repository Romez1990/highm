import React from 'react';
import BaseLayout, { LayoutProps } from './BaseLayout';

function MainLayout({ title, children }: LayoutProps): JSX.Element {
  return <BaseLayout title={title}>{children}</BaseLayout>;
}

export default MainLayout;
