// @flow

import { call } from 'redux-saga/effects';
import * as Api from '../services/Api';

export function* setCallApi(apiCall: any): SagaType {
  const response = yield call(() => Api.addApiHeader(apiCall));
  if (response.body.error) {
    throw (response.body);
  }
  return response.body.data;
}

export function callApi(apiCall: any): SagaType {
  return call(setCallApi, apiCall);
}
