import { combineReducers } from 'redux';
import { translationReducer } from './translation';

const appReducer = combineReducers({
  translation: translationReducer,
});

const initialState = {};

const rootReducer = (state = initialState, action) => (appReducer(state, action));

export default rootReducer;
