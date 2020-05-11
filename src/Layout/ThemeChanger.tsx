import React from 'react';
import { IconButton, Tooltip } from '@material-ui/core';
import {
  Brightness4 as Brightness4Icon,
  Brightness7 as Brightness7Icon,
} from '@material-ui/icons';
import { useProfileStore } from '../Store';

function ThemeChanger(): JSX.Element {
  const profileStore = useProfileStore();

  async function changeTheme(): Promise<void> {
    await profileStore.saveDarkTheme(!profileStore.darkMode)();
  }

  return (
    <Tooltip title={profileStore.darkMode ? 'Тёмный режим' : 'Светлый режим'}>
      <IconButton color="inherit" onClick={changeTheme}>
        {profileStore.darkMode ? <Brightness4Icon /> : <Brightness7Icon />}
      </IconButton>
    </Tooltip>
  );
}

export default ThemeChanger;
