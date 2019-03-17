// @flow
import { globalActionTypes } from '../globalActionTypes';

export const actionTypes = {
  GET_USER_MESSAGES_ACTION: {
    SUCCESS: 'GET_USER_MESSAGES_SUCCESS',
    REQUEST: 'GET_USER_MESSAGES_REQUEST',
    API_LOADING_START: 'GET_USER_MESSAGES_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_MESSAGES_API_LOADING_STOP',
  },
};

export const getUserMessagesActionCreator = () =>
  ({
    type: actionTypes.GET_USER_MESSAGES_ACTION.REQUEST,
  });

const initialState: MessagesStateType = {
  messageList: [],
  apiLoading: false,
};

export function messagesReducer(state: MessagesStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.GET_USER_MESSAGES_ACTION.API_LOADING_START:
      return { ...state, apiLoading: true };
    case actionTypes.GET_USER_MESSAGES_ACTION.API_LOADING_STOP:
      return { ...state, apiLoading: false };
    case actionTypes.GET_USER_MESSAGES_ACTION.SUCCESS:
      return {
        ...state,
        messageList: action.messages,
      };
    case globalActionTypes.LOGOUT_ACTION.SUCCESS:
      return initialState;
    default:
      return state;
  }
}
