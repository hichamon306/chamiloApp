// @flow
import { globalActionTypes } from '../globalActionTypes';

export const actionTypes = {
  GET_USER_MESSAGES_RECEIVED_ACTION: {
    SUCCESS: 'GET_USER_MESSAGES_RECEIVED_SUCCESS',
    REQUEST: 'GET_USER_MESSAGES_RECEIVED_REQUEST',
    API_LOADING_START: 'GET_USER_MESSAGES_RECEIVED_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_MESSAGES_RECEIVED_API_LOADING_STOP',
  },
  GET_USER_MESSAGES_SENT_ACTION: {
    SUCCESS: 'GET_USER_MESSAGES_SENT_SUCCESS',
    REQUEST: 'GET_USER_MESSAGES_SENT_REQUEST',
    API_LOADING_START: 'GET_USER_MESSAGES_SENT_API_LOADING_START',
    API_LOADING_STOP: 'GET_USER_MESSAGES_SENT_API_LOADING_STOP',
  },
};

export const getUserMessagesReceivedActionCreator = () =>
  ({
    type: actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.REQUEST,
  });

export const getUserMessagesSentActionCreator = () =>
  ({
    type: actionTypes.GET_USER_MESSAGES_SENT_ACTION.REQUEST,
  });

const initialState: MessagesStateType = {
  messagesReceived: [],
  messagesSent: [],
  apiLoading: false,
};

export function messagesReducer(state: MessagesStateType = initialState, action: any) {
  switch (action.type) {
    case actionTypes.GET_USER_MESSAGES_SENT_ACTION.API_LOADING_START:
    case actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.API_LOADING_START:
      return { ...state, apiLoading: true };
    case actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.API_LOADING_STOP:
    case actionTypes.GET_USER_MESSAGES_SENT_ACTION.API_LOADING_STOP:
      return { ...state, apiLoading: false };
    case actionTypes.GET_USER_MESSAGES_RECEIVED_ACTION.SUCCESS:
      return {
        ...state,
        messagesReceived: action.messages,
      };
    case actionTypes.GET_USER_MESSAGES_SENT_ACTION.SUCCESS:
      return {
        ...state,
        messagesSent: action.messages,
      };
    case globalActionTypes.LOGOUT_ACTION.SUCCESS:
      return initialState;
    default:
      return state;
  }
}
