import React, { Fragment, useState, MouseEvent } from 'react';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { AccountCircle } from '@material-ui/icons';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import Link from '../Link';
import { User } from '../../types/Profile';

interface Props {
  user: User;
}

const useStyles = makeStyles(() => createStyles({
  menuButton: {
    textTransform: 'none',
  },
}));

function UserMenu({ user }: Props) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const classes = useStyles();
  return (
    <Fragment>
      <Button
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup
        color="inherit"
        endIcon={<AccountCircle />}
        className={classes.menuButton}
        onClick={handleMenu}
      >
        {user.firstName} {user.lastName}
      </Button>
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
        <MenuItem
          onClick={handleClose}
          component={Link}
          href="/profile"
        >Profile</MenuItem>
        <MenuItem
          onClick={handleClose}
          component={Link}
          href="/logout"
        >Logout</MenuItem>
      </Menu>
    </Fragment>
  );
}

export default UserMenu;
