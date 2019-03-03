// @flow
import { takeLatest, put, select } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';
import * as Api from '../../services/Api';
import { callApi } from '../ApiAuthorization';
import { getAuthenticationData } from '../authentication';


function* getProfile() {
  const authenticationData = yield select(getAuthenticationData);
  const response = yield callApi(Api.getProfile(authenticationData));
  yield put({ type: actionTypes.GET_USER_PROFILE_ACTION.SUCCESS, userProfile: response });
}
export function* getProfileSagas(): SagaType {
  const requestActionType = actionTypes.GET_USER_PROFILE_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(getProfile, actionTypes.GET_USER_PROFILE_ACTION));
}
