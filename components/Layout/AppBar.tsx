import React from 'react';
import { isSome } from 'fp-ts/lib/Option';
import {
  makeStyles,
  createStyles,
  Theme,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
  IconButton,
} from '@material-ui/core';
import { Menu as MenuIcon } from '@material-ui/icons';
import ProfileMenu from './ProfileMenu';
import ThemeChanger from './ThemeChanger';
import { useProfileStore } from '../../store';

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
        {isSome(profile) && <ProfileMenu profile={profile.value} />}
        <ThemeChanger />
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
