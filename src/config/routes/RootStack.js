// @flow
import { createSwitchNavigator, createAppContainer } from 'react-navigation';
import * as Pages from '../../pages';
import AuthStack from './AuthStack';
import DrawerStack from './DrawerStack';

const RootStack = createSwitchNavigator(
  {
    AuthLoading: { screen: Pages.AuthLoading },
    App: DrawerStack,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
);

export default createAppContainer(RootStack);
