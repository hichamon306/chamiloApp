import { combineReducers } from 'redux';
import { translationReducer } from './translation';
import { authenticationReducer } from './authentication';
import { profileReducer } from './profile';
import { coursesReducer } from './courses';
import { messagesReducer } from './messages';

const appReducer = combineReducers({
  translation: translationReducer,
  authentication: authenticationReducer,
  profile: profileReducer,
  courses: coursesReducer,
  messages: messagesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
