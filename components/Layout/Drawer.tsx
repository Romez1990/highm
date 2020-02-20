import React from 'react';
import {
  makeStyles,
  createStyles,
  Theme,
  Drawer as MuiDrawer,
  List,
  ListItem,
} from '@material-ui/core';
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
}

function Drawer({ width, open }: Props): JSX.Element {
  const links: Link[] = [
    {
      href: '/',
      text: 'Main page',
    },
    {
      href: '/about',
      text: 'About',
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
            {link.text}
          </ListItem>
        ))}
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
