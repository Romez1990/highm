import { ThemeOptions } from '@material-ui/core/styles/createMuiTheme';
import red from '@material-ui/core/colors/red';
import { shallowEqual, useSelector } from 'react-redux';
import { AppState } from '../store/store';

const theme: ThemeOptions = {
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#19857b',
      dark: '#000',
    },
    error: {
      main: red.A400,
    },
    background: {},
  },
};

const useTheme = () => useSelector((state: AppState) => ({
  darkTheme: state.profile.darkTheme,
}), shallowEqual);

export default theme;

export {
  useTheme,
};
