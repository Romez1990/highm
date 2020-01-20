import React from 'react';
import { IconButton } from '@material-ui/core';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@material-ui/icons';
import { useProfileStore } from '../../store';

function ThemeChanger(): JSX.Element {
  const profileStore = useProfileStore();

  async function changeTheme(): Promise<void> {
    await profileStore.saveDarkTheme(!profileStore.darkMode)();
  }

  return (
    <IconButton color="inherit" onClick={changeTheme}>
      {profileStore.darkMode ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
}

export default ThemeChanger;
