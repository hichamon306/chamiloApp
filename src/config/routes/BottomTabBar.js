import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import * as Pages from '../../pages';
import CustomFooter from '../../components/Footer';
import MessageStack from './MessageStack';

const BottomTabBar = createBottomTabNavigator(
  {
    Home: Pages.Home,
    Courses: Pages.Courses,
    Catalogue: Pages.Catalogue,
    Messages: MessageStack,
  },
  {
    initialRouteName: 'Home',
    // eslint-disable-next-line react/prop-types
    tabBarComponent: props => (
      <CustomFooter
        {...props}
      />
    ),
  },
);
export default BottomTabBar;
