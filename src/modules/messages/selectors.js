// @flow
import { MESSAGE_STATUS_UNREAD } from '../../config/constants';

export const getMessagesReceivedList = (state: any) => state.messages.messagesReceived;
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
