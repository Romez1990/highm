import React, { Fragment, useState, MouseEvent } from 'react';
import {
  createStyles,
  makeStyles,
  Button,
  Menu,
  MenuItem,
  Tooltip,
} from '@material-ui/core';
import { AccountCircle as AccountCircleIcon } from '@material-ui/icons';
import Link from '../Link';
import { Profile } from '../Profile';

interface Props {
  profile: Profile;
}

interface Link {
  href: string;
  text: string;
}

const useStyles = makeStyles(
  createStyles({
    menuItem: {
      minWidth: 130,
    },
    menuButton: {
      textTransform: 'none',
    },
  }),
);

function ProfileMenu({ profile }: Props): JSX.Element {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  function handleMenu(event: MouseEvent<HTMLButtonElement>): void {
    setAnchorEl(event.currentTarget);
  }

  function handleClose(): void {
    setAnchorEl(null);
  }

  const links: Link[] = [
    {
      href: '/profile',
      text: 'Профиль',
    },
    {
      href: '/logout',
      text: 'Выйти',
    },
  ];

  const classes = useStyles();

  return (
    <Fragment>
      <Tooltip title="Профиль">
        <Button
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup
          color="inherit"
          endIcon={<AccountCircleIcon />}
          className={classes.menuButton}
          onClick={handleMenu}
        >
          {profile.firstName} {profile.lastName}
        </Button>
      </Tooltip>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        {links.map(link => (
          <MenuItem
            key={link.href}
            className={classes.menuItem}
            onClick={handleClose}
            component={Link}
            href={link.href}
            color="inherit"
            underline="none"
          >
            {link.text}
          </MenuItem>
        ))}
      </Menu>
    </Fragment>
  );
}

export default ProfileMenu;
