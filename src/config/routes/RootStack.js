// @flow
import React from 'react';
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import AppStack from './AppStack';
import * as Pages from '../../pages';
import AuthStack from './AuthStack';

const RootStack = createSwitchNavigator(
  {
    AuthLoading: { screen: Pages.AuthLoading },
    App: AppStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(RootStack);
