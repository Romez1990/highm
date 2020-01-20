import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const useStyles = makeStyles(() => ({
  menuButton: {
    textTransform: 'none',
  },
  title: {
    flexGrow: 1,
    font: '500 1.25rem / 1.6 Roboto, Helvetica, Arial, sans-serif',
    letterSpacing: '0.0075em',
  },
}));

interface Props {
  openDrawer(): void;
}

function AppBar({ openDrawer }: Props) {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <IconButton
          edge="start"
          className={classes.menuButton}
          color="inherit"
          onClick={openDrawer}
          aria-label="menu"
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h1" className={classes.title}>
          HighM
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
