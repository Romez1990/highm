import React, { ReactNode } from 'react';
import BaseLayout from './BaseLayout';

interface Props {
  title?: string;
  children: ReactNode;
}

function MainLayout({ title, children }: Props) {
  return (
    <BaseLayout title={title}>
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
