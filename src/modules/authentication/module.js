// @flow
import { globalActionTypes } from '../globalActionTypes';

export const actionTypes = {
  LOGIN_ACTION: {
    SUCCESS: 'LOGIN_ACTION_SUCCESS',
    REQUEST: 'LOGIN_ACTION_REQUEST',
    API_LOADING_START: 'LOGIN_ACTION_API_LOADING_START',
    API_LOADING_STOP: 'LOGIN_ACTION_API_LOADING_STOP',
  },
};

export const loginActionCreator = (username: string, password: string) =>
  ({
    type: actionTypes.LOGIN_ACTION.REQUEST,
    username,
    password,
  });

export const logoutActionCreator = () =>
  ({
    type: globalActionTypes.LOGOUT_ACTION.REQUEST,
  });

const initialState: AuthenticationStateType = {
  authenticationData: null,
  apiLoading: false,
};

export function authenticationReducer(state: AuthenticationStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.API_LOADING_START:
      return { ...state, apiLoading: true };
    case actionTypes.API_LOADING_STOP:
      return { ...state, apiLoading: false };
    case actionTypes.LOGIN_ACTION.SUCCESS:
      return {
        ...state,
        authenticationData: action.authenticationData,
      };
    case globalActionTypes.LOGOUT_ACTION.SUCCESS:
      return initialState;
    default:
      return state;
  }
}
