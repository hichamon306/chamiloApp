// @flow
import { takeLatest, put } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import { actionTypes as profileActionTypes } from '../profile';
import { actionTypes as coursesActionTypes } from '../courses';


function* loadData() {
  yield put({ type: profileActionTypes.GET_USER_PROFILE_ACTION.REQUEST });
  yield put({ type: coursesActionTypes.GET_USER_COURSES_ACTION.REQUEST });
  yield put({ type: coursesActionTypes.GET_USER_SESSIONS_ACTION.REQUEST });
}
export function* loadDataSagas(): SagaType {
  const requestActionType = actionTypes.LOAD_DATA_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(loadData, actionTypes.LOAD_DATA_ACTION));
}
