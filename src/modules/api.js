// @flow
import { delay } from 'redux-saga';
import { Alert } from 'react-native';
import { call, put, race } from 'redux-saga/effects';


export const catchApiExceptions = (saga: any, apiLoadingActionType: Object, timeout: number = 50000) =>
  function* (...args: any): SagaType {
    try {
      yield put({ type: apiLoadingActionType.API_LOADING_START });
      const { hasTimeOuted } = yield race({
        hasTimeOuted: call(delay, timeout),
        executeApiSaga: saga.apply(this, args),
      });
      if (hasTimeOuted) {
        // Toast.showError('une erreur est survenue', {}, true);
      }
      yield put({ type: apiLoadingActionType.API_LOADING_STOP });
    } catch (error) {
      Alert.alert('', error.message);
      // console.log(error);
      yield put({ type: apiLoadingActionType.API_LOADING_STOP });
    }
  };
