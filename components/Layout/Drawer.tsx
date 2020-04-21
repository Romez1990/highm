import React, { ReactElement } from 'react';
import { fromNullable } from 'fp-ts/lib/Option';
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
import {
  Home as HomeIcon,
  Info as InfoIcon,
  Group as GroupIcon,
} from '@material-ui/icons';
import Link from '../Link';
import AuthenticationService, {
  Permission,
} from '../../src/AuthenticationService';
import { useProfileStore } from '../../store';

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
  permission?: Permission;
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
    {
      href: '/groups',
      text: 'Groups',
      icon: <GroupIcon />,
      permission: 'IsTeacher',
    },
  ];

  const { profile } = useProfileStore();

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
        {links.map(link => {
          if (
            !AuthenticationService.hasPermission(
              profile,
              fromNullable(link.permission),
            )
          )
            return null;
          return (
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
          );
        })}
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
