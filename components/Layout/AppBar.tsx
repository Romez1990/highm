import React, { Fragment } from 'react';
import { useRouter } from 'next/router';
import { isSome } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import ProfileMenu from './ProfileMenu';
import ThemeChanger from './ThemeChanger';
import Link from '../Link';
import { useProfileStore } from '../../store';
import { resolveLoginPath } from '../../src/Redirect';

interface Props {
  toggleDrawerOpen(): void;
}

const useStyles = makeStyles(({ spacing, zIndex }: Theme) =>
  createStyles({
    appBar: {
      zIndex: zIndex.drawer + 1,
    },
    title: {
      marginLeft: spacing(2),
      flexGrow: 1,
      fontSize: '1.5rem',
    },
  }),
);

function AppBar({ toggleDrawerOpen }: Props): JSX.Element {
  const { profile } = useProfileStore();

  const router = useRouter();

  const loginPath = resolveLoginPath(router.asPath);

  const classes = useStyles();

  return (
    <MuiAppBar position="fixed" className={classes.appBar}>
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          onClick={toggleDrawerOpen}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography component="h1" variant="h6" className={classes.title}>
          HighM
        </Typography>
        {isSome(profile) ? (
          <ProfileMenu profile={profile.value} />
        ) : (
          <Fragment>
            <Button
              href="/register"
              component={Link}
              color="inherit"
              underline="none"
            >
              Register
            </Button>
            <Button
              href={loginPath}
              component={Link}
              color="inherit"
              underline="none"
            >
              Login
            </Button>
          </Fragment>
        )}
        <ThemeChanger />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
