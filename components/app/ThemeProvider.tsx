import React, { ReactNode } from 'react';
import { ThemeProvider as MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import theme, { useTheme } from '../../src/theme';

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props) {
  const { darkTheme } = useTheme();

  if (theme.palette)
    theme.palette.type = darkTheme ? 'dark' : 'light';

  return (
    <MuiThemeProvider theme={createMuiTheme(theme)}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
