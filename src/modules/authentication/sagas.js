// @flow
import { takeLatest, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import NavigationService from '../../services/navigator';
import { callApi } from '../ApiAuthorization';
import { globalActionTypes } from '../globalActionTypes';
import { actionTypes as dataLoaderActionTypes } from '../dataLoader';


function* login(action: any) {
  const authenticationData = {
    username: action.username,
    password: action.password,
  };
  const response = yield callApi(Api.login(authenticationData));
  if (response.error === true) {
    return Alert.alert('', response.message);
  }
  const data = {
    ...response,
    ...authenticationData,
  };
  yield put({ type: actionTypes.LOGIN_ACTION.SUCCESS, authenticationData: data });
  yield NavigationService.navigate('Home');
  yield put({ type: dataLoaderActionTypes.LOAD_DATA_ACTION.REQUEST });
}
export function* loginSagas(): SagaType {
  const requestActionType = actionTypes.LOGIN_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(login, actionTypes.LOGIN_ACTION));
}

function* logout() {
  yield put({ type: globalActionTypes.LOGOUT_ACTION.SUCCESS });
  yield NavigationService.navigate('Login');
}

export function* logoutSagas(): SagaType {
  const requestActionType = globalActionTypes.LOGOUT_ACTION.REQUEST;
  yield takeLatest(requestActionType, logout);
}
