import React, { useState, ReactNode } from 'react';
import AppBar from '../components/layout/AppBar';
import BaseLayout from './BaseLayout';

interface Props {
  title?: string;
  children: ReactNode;
}

function MainLayout({ title, children }: Props) {
  const [open, setOpen] = useState(false);

  function handleDrawerOpen() {
    setOpen(true);
  }

  return (
    <BaseLayout title={title}>
      <AppBar openDrawer={handleDrawerOpen} />
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
