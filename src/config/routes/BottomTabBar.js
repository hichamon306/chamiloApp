import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import * as Pages from '../../pages';
import CustomFooter from '../../components/Footer';

const BottomTabBar = createBottomTabNavigator(
  {
    Home: Pages.Home,
    Courses: Pages.Courses,
    Catalogue: Pages.Catalogue,
    Messages: Pages.Messages,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
    // eslint-disable-next-line react/prop-types
    tabBarComponent: props => (
      <CustomFooter
        {...props}
      />
    ),
  },
);

BottomTabBar.navigationOptions = () => ({
  header: null,
});

export default BottomTabBar;
