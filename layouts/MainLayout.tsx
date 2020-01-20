import React, { useState, ReactNode } from 'react';
import AppBar from '../components/layout/AppBar';
import Drawer from '../components/layout/Drawer';
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

  function handleDrawerClose() {
    setOpen(false);
  }

  return (
    <BaseLayout title={title}>
      <AppBar openDrawer={handleDrawerOpen} />
      <Drawer open={open} onClose={handleDrawerClose} />
      {children}
    </BaseLayout>
  );
}

export default MainLayout;
