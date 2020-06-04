import { createMuiTheme } from '@material-ui/core';
import grey from '@material-ui/core/colors/grey';
import BackgroundImage from '../../assets/img/light-grey-flare.jpg';

const lightTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#64C51E',
      contrastText: '#FFF',
    },
  },
  overrides: {
    MuiCssBaseline: {
      '@global': {
        body: {
          background: `url(${BackgroundImage})`,
        },
      },
    },
    MuiDrawer: {
      paper: {
        background: `rgba(255, 255, 255, 0.4)`,
      },
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
