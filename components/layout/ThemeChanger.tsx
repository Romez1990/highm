import React from 'react';
import { useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Brightness4Icon from '@material-ui/icons/Brightness4';
import Brightness7Icon from '@material-ui/icons/Brightness7';
import { saveDarkTheme } from '../../store/profile/action';
import { useTheme } from '../../src/theme';

function ThemeChanger() {
  const dispatch = useDispatch();

  async function changeTheme() {
    await dispatch(saveDarkTheme(!darkTheme));
  }

  const { darkTheme } = useTheme();

  return (
    <IconButton color="inherit" onClick={changeTheme}>
      {darkTheme
        ? <Brightness7Icon />
        : <Brightness4Icon />}
    </IconButton>);
}

export default ThemeChanger;
