import React from 'react';
import {
  makeStyles,
  createStyles,
  AppBar as MuiAppBar,
  Toolbar,
  Typography,
} from '@material-ui/core';

const useStyles = makeStyles(
  createStyles({
    title: {
      flexGrow: 1,
      fontSize: '1.5rem',
    },
  }),
);

function AppBar(): JSX.Element {
  const classes = useStyles();

  return (
    <MuiAppBar position="static">
      <Toolbar>
        <Typography component="h1" variant="h6" className={classes.title}>
          HighM
        </Typography>
      </Toolbar>
    </MuiAppBar>
  );
}

export default AppBar;
