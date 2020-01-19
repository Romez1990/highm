import {
  ProfileState,
  ProfileAction,
} from './action';

const initialState = {
  user: undefined,
};

function reducer(state: ProfileState = initialState, action: ProfileAction) {
  switch (action.type) {
    case 'SET_PROFILE':
      const user = { ...action.payload };
      const darkTheme = user.darkTheme;
      delete user.darkTheme;
      return {
        user,
        darkTheme,
      };
    case 'UNSET_PROFILE':
      return initialState;
    default:
      return state;
  }
}

export default reducer;
