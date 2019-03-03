import React from 'react';
import { createBottomTabNavigator } from 'react-navigation';
import * as Pages from '../../pages';
import CustomFooter from '../../components/Footer';

const AppStack = createBottomTabNavigator(
  {
    Home: Pages.Home,
    Courses: Pages.Courses,
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

AppStack.navigationOptions = () => ({
  header: null,
});

export default AppStack;
