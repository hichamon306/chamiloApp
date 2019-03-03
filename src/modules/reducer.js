import { combineReducers } from 'redux';
import { translationReducer } from './translation';
import { authenticationReducer } from './authentication';
import { profileReducer } from './profile';
import { coursesReducer } from './courses';

const appReducer = combineReducers({
  translation: translationReducer,
  authentication: authenticationReducer,
  profile: profileReducer,
  courses: coursesReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
