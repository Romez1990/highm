import { IncomingMessage } from 'http';
import { Action, Dispatch } from 'redux';
import { authenticate } from '../../src/auth';
import Profile, { User } from '../../types/Profile';

export interface ProfileState {
  user?: User;
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

export type ProfileAction =
  | SetProfileAction
  | UnsetProfileAction
  ;

export {
  getProfile,
  setProfile,
  unsetProfile,
};
