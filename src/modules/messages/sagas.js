// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';


function* getMessages() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getMessages(authenticationData));
  yield put({ type: actionTypes.GET_USER_MESSAGES_ACTION.SUCCESS, messages: response });
}
export function* getMessagesSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_MESSAGES_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(getMessages, actionTypes.GET_USER_MESSAGES_ACTION));
}
