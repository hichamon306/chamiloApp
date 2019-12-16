/* @flow */

import request from 'superagent';
import { API_URL } from '../config/environment';

export const login = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'authenticate',
      username: authenticationData.username,
      password: authenticationData.password,
    })
);

export const getProfile = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_profile',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const getUserCourses = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_courses',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const getUserSessions = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_sessions',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const getMessagesReceived = (authenticationData: any, lastId: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_messages_received',
      last: lastId,
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const getMessagesSent = (authenticationData: any, lastId: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_messages_sent',
      last: lastId,
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const registerDeviceToken = (authenticationData: any, fcmToken: string) => (
  request
    .post(API_URL)
    .send({
      action: 'gcm_id',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
      registration_id: fcmToken,
    })
);

export const deleteUserMessage = (authenticationData: any, messageId: string, messageType: any) => (
  request
    .post(API_URL)
    .send({
      action: 'delete_user_message',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
      message_id: messageId,
      msg_type: messageType,
    })
);

export const setMessageRead = (authenticationData: any, messageId: string) => (
  request
    .post(API_URL)
    .send({
      action: 'set_message_read',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
      message_id: messageId,
    })
);

export const getUsers = (authenticationData: any, search: string) => (
  request
    .post(API_URL)
    .send({
      action: 'message_users',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
      q: search,
    })
);

export const sendMessage = (authenticationData: any, messageObject: any) => {
  const data = {
    action: 'save_user_message',
    username: authenticationData.username,
    api_key: authenticationData.apiKey,
    text: messageObject.message,
    subject: messageObject.subject,
  };

  messageObject.users.forEach((user, index) => {
    data[`receivers[${index}]`] = user;
  });

  return request
    .post(API_URL)
    .send(data);
};

export const addApiHeader = (apiCall: any) => apiCall.set('Content-Type', 'multipart/form-data').type('form');
