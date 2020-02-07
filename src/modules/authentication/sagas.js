// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import NavigationService from '../../services/navigator';
import { callApi } from '../ApiAuthorization';
import { globalActionTypes } from '../globalActionTypes';
import { getAuthenticationData, getRememberMe } from './selectors';
import { actionTypes as dataLoaderActionTypes } from '../dataLoader';


function* registerDeviceToken(action: any) {
  const authenticationData = yield select(getAuthenticationData);
  const { fcmToken } = action;
  yield callApi(Api.registerDeviceToken(authenticationData, fcmToken));
  const data = {
    ...authenticationData,
    fcmToken,
  };
  const rememberMe = yield select(getRememberMe);
  yield put({ type: actionTypes.LOGIN_ACTION.SUCCESS, authenticationData: data, rememberMe });
}
export function* registerDeviceTokenSagas(): SagaType {
  const requestActionType = actionTypes.REGISTER_DEVICE_TOKEN.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(registerDeviceToken, actionTypes.REGISTER_DEVICE_TOKEN));
}

function* login(action: any) {
  const authenticationData = {
    username: action.username,
    password: action.password,
  };
  const { rememberMe } = action;
  const response = yield callApi(Api.login(authenticationData));
  if (response.error === true) {
    return Alert.alert('', response.message);
  }
  const data = {
    ...response,
    ...authenticationData,
  };
  yield put({ type: actionTypes.LOGIN_ACTION.SUCCESS, authenticationData: data, rememberMe });
  yield NavigationService.navigate('AuthLoading');
  yield put({ type: dataLoaderActionTypes.LOAD_DATA_ACTION.REQUEST });
}
export function* loginSagas(): SagaType {
  const requestActionType = actionTypes.LOGIN_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(login, actionTypes.LOGIN_ACTION));
}

function* logout() {
  yield NavigationService.navigate('Login');
  yield put({ type: globalActionTypes.LOGOUT_ACTION.SUCCESS });
}

export function* logoutSagas(): SagaType {
  const requestActionType = globalActionTypes.LOGOUT_ACTION.REQUEST;
  yield takeLatest(requestActionType, logout);
}
