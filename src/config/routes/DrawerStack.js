// @flow
import React from 'react';
import { createDrawerNavigator } from 'react-navigation';
import AppStack from './AppStack';
import * as Pages from '../../pages';

const customDrawerComponent = props => (
  <Pages.DrawerNavigation {...props} />
);

const DrawerStack = createDrawerNavigator(
  {
    AppStack,
  },
  {
    initialRouteName: 'AppStack',
    contentComponent: customDrawerComponent,
  },
);

export default DrawerStack;
