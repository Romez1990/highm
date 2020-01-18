import React, { ReactNode } from 'react';
import {
  ThemeProvider as MuiThemeProvider,
  CssBaseline,
} from '@material-ui/core';
import theme from '../../src/Theme';

interface Props {
  children: ReactNode;
}

function ThemeProvider({ children }: Props): JSX.Element {
  return (
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      {children}
    </MuiThemeProvider>
  );
}

export default ThemeProvider;
