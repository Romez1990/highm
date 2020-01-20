import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import MuiDrawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ListItem from '@material-ui/core/ListItem';
import Link from '../Link';

const drawerWidth = 240;

const useStyles = makeStyles(({ spacing, transitions, mixins }: Theme) =>
  createStyles({
    container: {
      display: 'flex',
    },
    appBar: {
      transition: transitions.create(['margin', 'width'], {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
      transition: transitions.create(['margin', 'width'], {
        easing: transitions.easing.easeOut,
        duration: transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: spacing(2),
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
    },
    drawerPaper: {
      width: drawerWidth,
    },
    drawerHeader: {
      display: 'flex',
      alignItems: 'center',
      padding: spacing(0, 1),
      ...mixins.toolbar,
      justifyContent: 'flex-end',
    },
    content: {
      flexGrow: 1,
      padding: spacing(3),
      transition: transitions.create('margin', {
        easing: transitions.easing.sharp,
        duration: transitions.duration.leavingScreen,
      }),
      marginLeft: -drawerWidth,
    },
    contentShift: {
      transition: transitions.create('margin', {
        easing: transitions.easing.easeOut,
        duration: transitions.duration.enteringScreen,
      }),
      marginLeft: 0,
    },
  }),
);

interface Props {
  open: boolean;

  onClose(): void;
}

function Drawer({ open, onClose }: Props) {
  const classes = useStyles();
  return (
    <MuiDrawer
      className={classes.drawer}
      variant="persistent"
      anchor="left"
      open={open}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <div className={classes.drawerHeader}>
        <IconButton onClick={onClose}>
          <ChevronLeftIcon />
        </IconButton>
      </div>
      <Divider />
      <List>
        <ListItem button href="/" component={Link}>Home page</ListItem>
        <ListItem button href="/about" component={Link}>About</ListItem>
      </List>
      <Divider />
    </MuiDrawer>
  );
}

export default Drawer;
