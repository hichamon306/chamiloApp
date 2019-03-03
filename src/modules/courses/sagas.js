// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';


function* getUserCourses() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getUserCourses(authenticationData));
  yield put({ type: actionTypes.GET_USER_COURSES_ACTION.SUCCESS, courseList: response });
}
export function* getUserCoursesSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_COURSES_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(getUserCourses, actionTypes.GET_USER_COURSES_ACTION));
}

function* getUserSessions() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getUserSessions(authenticationData));
  yield put({ type: actionTypes.GET_USER_SESSIONS_ACTION.SUCCESS, sessionList: response });
}
export function* getUserSessionsSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_SESSIONS_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(getUserSessions, actionTypes.GET_USER_SESSIONS_ACTION));
}
