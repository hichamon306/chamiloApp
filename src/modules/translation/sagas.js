// @flow
import { takeLatest, put } from 'redux-saga/effects';
import { actionTypes } from '.';
import { catchApiExceptions } from '../api';


function* switchLanguage(action: any) {
  yield put({ type: actionTypes.SWITCH_TRANSLATION_ACTION.SUCCESS, currentLanguage: action.currentLanguage });
}
export function* switchLanguageSagas(): SagaType {
  const requestActionType = actionTypes.SWITCH_TRANSLATION_ACTION.REQUEST;
  yield takeLatest(requestActionType, catchApiExceptions(switchLanguage, actionTypes.SWITCH_TRANSLATION_ACTION));
}
