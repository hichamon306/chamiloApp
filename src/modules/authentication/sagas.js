// @flow
import { takeLatest, put } from 'redux-saga/effects';
import { Alert } from 'react-native';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import NavigationService from '../../services/navigator';
import { unAuthenticatedCall } from '../ApiAuthorization';
import { globalActionTypes } from '../globalActionTypes';


function* login(action: any) {
  const authenticationData = {
    username: action.username,
    password: action.password,
  };
  const response = yield unAuthenticatedCall(Api.login(authenticationData));
  if (response.error === true) {
    return Alert.alert('', response.message);
  }
  yield put({ type: actionTypes.LOGIN_ACTION.SUCCESS, authenticationData: response });
  yield NavigationService.navigate('Home');
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
