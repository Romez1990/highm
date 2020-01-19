import { IncomingMessage } from 'http';
import { Action, Dispatch } from 'redux';
import { authenticate } from '../../src/auth';
import { createAxios } from '../../src/axios';
import { getCookie, setCookie } from '../../src/cookies';
import Profile, { User } from '../../types/Profile';
import { AppState } from '../store';

export interface ProfileState {
  user?: User;
  darkTheme: boolean;
}

interface SetProfileAction extends Action {
  type: 'SET_PROFILE';
  payload: Profile;
}

const getProfile = (req?: IncomingMessage) => async (dispatch: Dispatch<SetProfileAction>) => {
  const profile = await authenticate(req);
  if (!profile) return;
  dispatch({ type: 'SET_PROFILE', payload: profile });
  return profile;
};

const setProfile = (profile: Profile) => (dispatch: Dispatch<SetProfileAction>) => {
  dispatch({ type: 'SET_PROFILE', payload: profile });
};

interface UnsetProfileAction extends Action {
  type: 'UNSET_PROFILE';
}

const unsetProfile = () => (dispatch: Dispatch<UnsetProfileAction>) => {
  dispatch({ type: 'UNSET_PROFILE' });
};

interface SetDarkTheme extends Action {
  type: 'SET_DARK_THEME';
  payload: boolean;
}

const getDarkTheme = (req?: IncomingMessage) => (dispatch: Dispatch<SetDarkTheme>) => {
  const darkTheme = getCookie('darkTheme', req) === 'true';
  dispatch({ type: 'SET_DARK_THEME', payload: darkTheme });
  return darkTheme;
};

const setDarkTheme = (darkTheme: boolean) => (dispatch: Dispatch<SetDarkTheme>) => {
  dispatch({ type: 'SET_DARK_THEME', payload: darkTheme });
};

const saveDarkTheme = (darkTheme: boolean) => async (dispatch: Dispatch<SetDarkTheme>, getState: () => AppState) => {
  const { profile } = getState();
  if (profile.user) {
    const axios = createAxios();
    await axios.patch('/auth/profile/', {
      darkTheme,
    });
  } else {
    setCookie('darkTheme', darkTheme.toString());
  }
  dispatch({ type: 'SET_DARK_THEME', payload: darkTheme });
};

interface SwitchThemeAction extends Action {
  type: 'SWITCH_THEME';
}

export type ProfileAction =
  | SetProfileAction
  | UnsetProfileAction
  | SetDarkTheme
  | SwitchThemeAction
  ;

export {
  getProfile,
  setProfile,
  unsetProfile,
  getDarkTheme,
  setDarkTheme,
  saveDarkTheme,
};
