// @flow
// import { drop } from 'lodash';
import { MESSAGE_STATUS_UNREAD } from '../../config/constants';

/*
const messagePerPage = 10;

function getPaginatedItems(items, page, pageSize) {
  var pg = page || 1,
    pgSize = pageSize || 100,
    offset = (pg - 1) * pgSize,
    pagedItems = drop(items, offset).slice(0, pgSize);
  return {
    page: pg,
    pageSize: pgSize,
    total: items.length,
    total_pages: Math.ceil(items.length / pgSize),
    data: pagedItems,
  };
}
*/

export const getMessagesReceivedList = (state: any) => {
  const { messagesReceived /* , currentPage */ } = state.messages;
  return messagesReceived;
  // return getPaginatedItems(messagesReceived, currentPage, messagePerPage);
};
export const getMessagesSentList = (state: any) => state.messages.messagesSent;

export const getCountUnreadMessages =
  (state: any) => state.messages.messagesReceived.filter(message => message.msgStatus === MESSAGE_STATUS_UNREAD).length;

export const getUserList = (state: any) => state.messages.userList;

export const getMessageReceivedLastId = (state: any) => {
  const msgList = getMessagesReceivedList(state);
  if (msgList.length > 0) {
    return msgList[0].id;
  }
  return 0;
};

export const getMessageSentLastId = (state: any) => {
  const msgList = getMessagesSentList(state);
  if (msgList.length > 0) {
    return msgList[0].id;
  }
  return 0;
};

export const getCurrentPage = (state: any) => state.messages.currentPage;
