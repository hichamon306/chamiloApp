import { combineReducers } from 'redux';
import { translationReducer } from './translation';
import { authenticationReducer } from './authentication';

const appReducer = combineReducers({
  translation: translationReducer,
  authentication: authenticationReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
