// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { uniqBy } from 'lodash';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';
import { getUserList } from './selectors';


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


function* updateMessageStatus(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const { messageId, msgStatus } = action;
  if (msgStatus !== '0') {
    yield callApi(Api.updateMessageStatus(authenticationData, messageId, msgStatus));
    return;
  }
  yield callApi(Api.setMessageRead(authenticationData, messageId));
}
export function* updateMessageStatusSagas(): SagaType {
  const requestActionType = actionTypes.UPDATE_MESSAGE_STATUS_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(updateMessageStatus, actionTypes.UPDATE_MESSAGE_STATUS_ACTION));
}

function* getUsers(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const userList = yield select(getUserList);
  const response = yield callApi(Api.getUsers(authenticationData, action.search));
  yield put({ type: actionTypes.GET_USERS_ACTION.SUCCESS, userList: uniqBy(response.concat(userList), 'id') });
}

export function* getUsersStatusSagas(): SagaType {
  const requestActionType = actionTypes.GET_USERS_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(getUsers, actionTypes.GET_USERS_ACTION));
}

function* sendMessage(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  yield callApi(Api.sendMessage(authenticationData, action.messageObject));
  if (action.callback) {
    action.callback();
  }
}

export function* sendMessageSagas(): SagaType {
  const requestActionType = actionTypes.SEND_MESSAGE_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(sendMessage, actionTypes.SEND_MESSAGE_ACTION));
}
