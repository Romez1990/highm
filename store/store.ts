import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunkMiddleware, { ThunkMiddleware } from 'redux-thunk';

export interface AppState {
}

export type AppAction = never;

const initStore = () => createStore(
  combineReducers({
  }),
  applyMiddleware(thunkMiddleware as ThunkMiddleware<AppState, AppAction>),
);

export default initStore;
