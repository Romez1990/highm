import { createMuiTheme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
  },
});

const darkTheme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#90caf9',
    },
    background: {
      default: grey[900],
    },
  },
  overrides: {
    MuiAppBar: {
      root: {
        background: '#333',
      },
    },
  },
});

export { lightTheme, darkTheme };
