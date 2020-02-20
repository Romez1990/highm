import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import AppBar from '../components/Layout/AppBar';
import Drawer from '../components/Layout/Drawer';
import BaseLayout, { LayoutProps } from './BaseLayout';

interface StyleProps {
  drawerWidth: number;
}

const useStyles = makeStyles(
  ({ spacing, transitions, mixins: { toolbar } }: Theme) =>
    createStyles({
      toolbar,
      content: {
        paddingTop: spacing(2),
        transition: transitions.create('margin', {
          easing: transitions.easing.sharp,
          duration: transitions.duration.leavingScreen,
        }),
      },
      contentShift: ({ drawerWidth }: StyleProps) => ({
        marginLeft: drawerWidth,
        transition: transitions.create('margin', {
          easing: transitions.easing.easeOut,
          duration: transitions.duration.enteringScreen,
        }),
      }),
    }),
);

function MainLayout({ title, children }: LayoutProps): JSX.Element {
  const [open, setOpen] = useState(false);

  function toggleDrawerOpen(): void {
    setOpen(!open);
  }

  const drawerWidth = 240;

  const classes = useStyles({ drawerWidth });

  return (
    <BaseLayout title={title}>
      <AppBar toggleDrawerOpen={toggleDrawerOpen} />
      <Drawer width={drawerWidth} open={open} />
      <div className={classes.toolbar} />
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        {children}
      </main>
    </BaseLayout>
  );
}

export default MainLayout;
