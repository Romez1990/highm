import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';
import { ProfileState, ProfileAction } from './profile/action';
import profile from './profile/reducer';

export interface AppState {
  profile: ProfileState;
}

export type AppAction =
  | ProfileAction
  ;

const initStore = () => createStore(
  combineReducers({
    profile,
  }),
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>),
);

export default initStore;
