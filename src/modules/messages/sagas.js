// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';


function* getMessagesReceived() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getMessagesReceived(authenticationData));
  yield put({ type: actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.SUCCESS, messages: response });
}
export function* getMessagesReceivedSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(getMessagesReceived, actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION));
}

function* getMessagesSent() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getMessagesSent(authenticationData));
  yield put({ type: actionTypes.GET_USER_MESSAGES_SENT_ACTION.SUCCESS, messages: response });
}
export function* getMessagesSentSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_MESSAGES_SENT_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(getMessagesSent, actionTypes.GET_USER_MESSAGES_SENT_ACTION));
}
