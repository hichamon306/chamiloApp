/* @flow */

import request from 'superagent';
import { API_URL } from '../config/environment';

export const login = (authenticationData: any) => (
  request
    .post(`${API_URL}`)
    .send({
      action: 'authenticate',
      username: authenticationData.username,
      password: authenticationData.password,
    })
);


export const addApiHeader = (apiCall: any) => apiCall.set('Content-Type', 'multipart/form-data').type('form');
