import React from 'react';
import AppBar from '../components/Layout/AppBar';
import BaseLayout, { LayoutProps } from './BaseLayout';

function MainLayout({ title, children }: LayoutProps): JSX.Element {
  return (
    <BaseLayout title={title}>
      <AppBar />
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
