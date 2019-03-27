import React from 'react';
import { Button, Icon } from 'native-base';
import { createBottomTabNavigator } from 'react-navigation';
import * as Pages from '../../pages';
import CustomFooter from '../../components/Footer';
import Header from '../../components/Header';

const headerRight = (
  <Button transparent>
    <Icon name="menu" />
  </Button>
);

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
  header: <Header left={headerRight} />,
});

export default BottomTabBar;
