// @flow

import { call } from 'redux-saga/effects';
import * as Api from '../services/Api';

export function* setCallApi(apiCall: any): SagaType {
  const response = yield call(() => Api.addApiHeader(apiCall));
  return response.body;
}

export function unAuthenticatedCall(apiCall: any): SagaType {
  return call(setCallApi, apiCall);
}
