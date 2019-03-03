import { fork, all } from 'redux-saga/effects';
import { switchLanguageSagas } from './translation';
import { loginSagas, logoutSagas } from './authentication';
import { getProfileSagas } from './profile';
import { loadDataSagas } from './dataLoader';
import { getUserCoursesSagas, getUserSessionsSagas } from './courses';

export default function* rootSaga() {
  yield all([
    fork(switchLanguageSagas),
    fork(loginSagas),
    fork(logoutSagas),
    fork(getProfileSagas),
    fork(loadDataSagas),
    fork(getUserCoursesSagas),
    fork(getUserSessionsSagas),
  ]);
}
