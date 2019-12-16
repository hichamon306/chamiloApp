// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { uniqBy } from 'lodash';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';
import { getUserList, getMessageReceivedLastId, getMessageSentLastId } from './selectors';


function* getMessagesReceived() {
  const authenticationData = yield select(getAuthenticationData);
  const lastId = yield select(getMessageReceivedLastId);
  const response = yield callApi(Api.getMessagesReceived(authenticationData, lastId));
  yield put({ type: actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.SUCCESS, messages: response });
}
export function* getMessagesReceivedSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(getMessagesReceived, actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION));
}

function* getMessagesSent() {
  const authenticationData = yield select(getAuthenticationData);
  const lastId = yield select(getMessageSentLastId);
  const response = yield callApi(Api.getMessagesSent(authenticationData, lastId));
  yield put({ type: actionTypes.GET_USER_MESSAGES_SENT_ACTION.SUCCESS, messages: response });
}
export function* getMessagesSentSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_MESSAGES_SENT_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(getMessagesSent, actionTypes.GET_USER_MESSAGES_SENT_ACTION));
}

function* updateMessageStatus(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const { messageId, msgStatus, messageType } = action;
  if (msgStatus !== '0') {
    yield callApi(Api.updateMessageStatus(authenticationData, messageId, msgStatus));
    return;
  }
  yield callApi(Api.setMessageRead(authenticationData, messageId));
  yield put({ type: actionTypes.UPDATE_MESSAGE_STATUS_ACTION.SUCCESS, messageId, messageType });
}
export function* updateMessageStatusSagas(): SagaType {
  const requestActionType = actionTypes.UPDATE_MESSAGE_STATUS_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(updateMessageStatus, actionTypes.UPDATE_MESSAGE_STATUS_ACTION));
}

function* deleteUserMessage(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const { messageId, msgType } = action;
  yield callApi(Api.deleteUserMessage(authenticationData, messageId, msgType));
  yield put({
    type: actionTypes.DELETE_USER_MESSAGE_ACTION.SUCCESS,
    messageId,
    messageType: msgType,
  });
  if (action.callback) {
    action.callback();
  }
}
export function* deleteUserMessageSagas(): SagaType {
  const requestActionType = actionTypes.DELETE_USER_MESSAGE_ACTION.REQUEST;
  yield takeLatest(requestActionType,
    catchApiExceptions(deleteUserMessage, actionTypes.DELETE_USER_MESSAGE_ACTION));
}

function* getUsers(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const userList = yield select(getUserList);
  const response = yield callApi(Api.getUsers(authenticationData, action.search));
  yield put({ type: actionTypes.GET_USERS_ACTION.SUCCESS, userList: uniqBy(response.concat(userList), 'id') });
}

export function* getUsersSagas(): SagaType {
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
