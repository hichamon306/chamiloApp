import { fork } from 'redux-saga/effects';
import { switchLanguageSagas } from './translation';

export default function* rootSaga() {
   yield fork(switchLanguageSagas);
}
