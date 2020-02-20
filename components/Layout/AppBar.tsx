import React from 'react';
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
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
