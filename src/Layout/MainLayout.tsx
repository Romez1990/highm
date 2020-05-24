import React, { useState } from 'react';
import { makeStyles, createStyles, Theme } from '@material-ui/core';
import clsx from 'clsx';
import AppBar from './AppBar';
import Drawer from './Drawer';
import BaseLayout, { LayoutProps } from './BaseLayout';

interface StyleProps {
  drawerWidth: number;
}

const useStyles = makeStyles(
  ({ spacing, transitions, mixins: { toolbar } }: Theme) =>
    createStyles({
      root: {
        height: '100vh',
        display: 'flex',
        flexFlow: 'column',
      },
      toolbar,
      content: {
        flexGrow: 1,
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
  const [drawerOpen, setDrawerOpen] = useState(true);

  function toggleDrawerOpen(): void {
    setDrawerOpen(!drawerOpen);
  }

  const drawerWidth = 240;

  const classes = useStyles({ drawerWidth });

  return (
    <BaseLayout title={title}>
      <div className={classes.root}>
        <AppBar drawerOpen={drawerOpen} toggleDrawerOpen={toggleDrawerOpen} />
        <Drawer width={drawerWidth} open={drawerOpen} />
        <div className={classes.toolbar} />
        <main
          className={clsx(classes.content, {
            [classes.contentShift]: drawerOpen,
          })}
        >
          {children}
        </main>
      </div>
    </BaseLayout>
  );
}

export default MainLayout;
