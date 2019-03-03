// @flow

// action types
export const actionTypes = {
  LOAD_DATA_ACTION: {
    REQUEST: 'LOAD_DATA_ACTION_REQUEST',
    API_LOADING_START: 'LOAD_DATA_ACTION_API_LOADING_START',
    API_LOADING_STOP: 'LOAD_DATA_ACTION_API_LOADING_STOP',
  },
};

export const loadDataActionCreator = () =>
  ({
    type: actionTypes.LOAD_DATA_ACTION.REQUEST,
  });
