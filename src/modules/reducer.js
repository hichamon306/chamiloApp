import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';
import { translationReducer } from './translation';
import { authenticationReducer } from './authentication';
import { profileReducer } from './profile';
import { coursesReducer } from './courses';
import { messagesReducer } from './messages';

const authConfig = {
  key: 'authentication',
  storage: AsyncStorage,
  blacklist: ['authenticationData'],
  stateReconciler: autoMergeLevel2,
};
const authReducer = persistReducer(authConfig, authenticationReducer);

const appReducer = combineReducers({
  translation: translationReducer,
  authentication: authReducer,
  profile: profileReducer,
  courses: coursesReducer,
  messages: messagesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
