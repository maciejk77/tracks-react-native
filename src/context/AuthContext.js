import { AsyncStorage } from 'react-native';
import createDataContext from './createDataContext';
import trackerApi from '../api/tracker';
import { navigate } from '../navigationRef';

const authReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ERROR':
      return { ...state, errorMessage: action.payload };
    case 'SIGN_UP':
      return { errorMessage: '', token: action.payload };
    default:
      return state;
  }
};

const signup = dispatch => async ({ email, password }) => {
  try {
    const response = await trackerApi.post('/signup', { email, password });
    await AsyncStorage.setItem('token', response.data.token);
    dispatch({ type: 'SIGN_UP', payload: response.data.token });
    navigate('TrackList');
  } catch (error) {
    dispatch({
      type: 'ADD_ERROR',
      payload: `Something went wrong with sign up`
    });
  }
};

const signin = dispatch => {
  return async ({ email, password }) => {};
};

const signout = dispatch => {
  return async ({ email, password }) => {};
};

export const { Provider, Context } = createDataContext(
  authReducer,
  { signin, signout, signup },
  { token: null, errorMessage: null }
);
