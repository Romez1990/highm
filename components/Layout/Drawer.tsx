import React, { ReactElement } from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Drawer as MuiDrawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@material-ui/core';
import { Home as HomeIcon, Info as InfoIcon } from '@material-ui/icons';
import Link from '../Link';

interface StyleProps {
  width: number;
}

interface Props extends StyleProps {
  open: boolean;
}

const useStyles = makeStyles(({ mixins: { toolbar } }: Theme) =>
  createStyles({
    drawer: ({ width }: StyleProps) => ({
      width,
    }),
    drawerPaper: ({ width }: StyleProps) => ({
      width,
    }),
    toolbar,
  }),
);

interface Link {
  href: string;
  text: string;
  icon: ReactElement;
}

function Drawer({ width, open }: Props): JSX.Element {
  const links: Link[] = [
    {
      href: '/',
      text: 'Main page',
      icon: <HomeIcon />,
    },
    {
      href: '/about',
      text: 'About',
      icon: <InfoIcon />,
    },
  ];

  const classes = useStyles({ width });

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
      <div className={classes.toolbar} />
      <List>
        {links.map(link => (
          <ListItem
            key={link.href}
            button
            component={Link}
            href={link.href}
            color="inherit"
            underline="none"
          >
            <ListItemIcon>{link.icon}</ListItemIcon>
            <ListItemText>{link.text}</ListItemText>
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
