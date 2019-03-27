import React from 'react';
import { createStackNavigator } from 'react-navigation';
import { Button, Icon } from 'native-base';
import * as Pages from '../../pages';
import BottomTabBar from './BottomTabBar';
import Header from '../../components/Header';

const AppStack = createStackNavigator(
  {
    TabBar: BottomTabBar,
    WebView: Pages.CustomWebView,
    MessageView: Pages.MessageView,
    NewMessage: Pages.NewMessage,
  },
  {
    initialRouteName: 'TabBar',
    defaultNavigationOptions: ({ navigation }) => {
      const { routeName } = navigation.state;
      const headerProps = {
        left: routeName !== 'TabBar' && (
          <Button onPress={() => navigation.goBack()} transparent>
            <Icon name="arrow-back" />
          </Button>),
      };
      return {
        header: <Header {...headerProps} />,
      };
    },
  },
);

export default AppStack;
