// @flow
import { globalActionTypes } from '../globalActionTypes';

export const actionTypes = {
  GET_USER_PROFILE_ACTION: {
    SUCCESS: 'GET_USER_PROFILE_SUCCESS',
    REQUEST: 'GET_USER_PROFILE_REQUEST',
    API_LOADING_START: 'GET_USER_PROFILE_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_PROFILE_API_LOADING_STOP',
  },
};

export const getUserProfileActionCreator = () =>
  ({
    type: actionTypes.GET_USER_PROFILE_ACTION.REQUEST,
  });

const initialState: ProfileStateType = {
  userProfile: null,
  apiLoading: false,
};

export function profileReducer(state: ProfileStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.GET_USER_PROFILE_ACTION.API_LOADING_START:
      return { ...state, apiLoading: true };
    case actionTypes.GET_USER_PROFILE_ACTION.API_LOADING_STOP:
      return { ...state, apiLoading: false };
    case actionTypes.GET_USER_PROFILE_ACTION.SUCCESS:
      return {
        ...state,
        userProfile: action.userProfile,
      };
    case globalActionTypes.LOGOUT_ACTION.SUCCESS:
      return initialState;
    default:
      return state;
  }
}
