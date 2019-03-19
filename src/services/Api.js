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

export const getMessagesReceived = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_messages_received',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);

export const getMessagesSent = (authenticationData: any) => (
  request
    .post(API_URL)
    .send({
      action: 'user_messages_sent',
      username: authenticationData.username,
      api_key: authenticationData.apiKey,
    })
);


export const addApiHeader = (apiCall: any) => apiCall.set('Content-Type', 'multipart/form-data').type('form');
