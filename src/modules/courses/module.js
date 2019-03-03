// @flow
import { globalActionTypes } from '../globalActionTypes';

export const actionTypes = {
  GET_USER_COURSES_ACTION: {
    SUCCESS: 'GET_USER_COURSES_SUCCESS',
    REQUEST: 'GET_USER_COURSES_REQUEST',
    API_LOADING_START: 'GET_USER_COURSES_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_COURSES_API_LOADING_STOP',
  },
  GET_USER_SESSIONS_ACTION: {
    SUCCESS: 'GET_USER_SESSIONS_SUCCESS',
    REQUEST: 'GET_USER_SESSIONS_REQUEST',
    API_LOADING_START: 'GET_USER_SESSIONS_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_SESSIONS_API_LOADING_STOP',
  },
};

export const getUserCoursesActionCreator = () =>
  ({
    type: actionTypes.GET_USER_COURSES_ACTION.REQUEST,
  });
export const getUserSessionsActionCreator = () =>
  ({
    type: actionTypes.GET_USER_SESSIONS_ACTION.REQUEST,
  });

const initialState: CoursesStateType = {
  courseList: [],
  sessionList: [],
  apiLoading: false,
};

export function coursesReducer(state: CoursesStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.GET_USER_COURSES_ACTION.API_LOADING_START:
    case actionTypes.GET_USER_SESSIONS_ACTION.API_LOADING_START:
      return { ...state, apiLoading: true };
    case actionTypes.GET_USER_COURSES_ACTION.API_LOADING_STOP:
    case actionTypes.GET_USER_SESSIONS_ACTION.API_LOADING_STOP:
      return { ...state, apiLoading: false };
    case actionTypes.GET_USER_COURSES_ACTION.SUCCESS:
      return {
        ...state,
        courseList: action.courseList,
      };
    case actionTypes.GET_USER_SESSIONS_ACTION.SUCCESS:
      return {
        ...state,
        sessionList: action.sessionList,
      };
    case globalActionTypes.LOGOUT_ACTION.SUCCESS:
      return initialState;
    default:
      return state;
  }
}
