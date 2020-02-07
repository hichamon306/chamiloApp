// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import { getAuthenticationData } from '../authentication';
import { actionTypes as profileActionTypes } from '../profile';
import { actionTypes as coursesActionTypes } from '../courses';
import { actionTypes as messagesActionTypes } from '../messages';


function* loadData() {
  const authenticationData = yield select(getAuthenticationData);
  if (authenticationData) {
    yield put({ type: profileActionTypes.GET_USER_PROFILE_ACTION.REQUEST });
    yield put({ type: coursesActionTypes.GET_USER_COURSES_ACTION.REQUEST });
    yield put({ type: coursesActionTypes.GET_USER_SESSIONS_ACTION.REQUEST });
    yield put({ type: messagesActionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.REQUEST });
    yield put({ type: messagesActionTypes.GET_USER_MESSAGES_SENT_ACTION.REQUEST });
  }
}
export function* loadDataSagas(): SagaType {
  const requestActionType = actionTypes.LOAD_DATA_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(loadData, actionTypes.LOAD_DATA_ACTION));
}
