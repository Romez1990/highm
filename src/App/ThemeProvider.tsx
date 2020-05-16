import React, { ReactNode } from 'react';
import { observer } from 'mobx-react-lite';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import { useProfileStore } from '../Store';
import { lightTheme, darkTheme } from '../Theme';

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): JSX.Element {
  const { darkMode } = useProfileStore();
  const theme = darkMode ? darkTheme : lightTheme;
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default observer(ThemeProvider);
