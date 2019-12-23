import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';

const AuthStack = createStackNavigator(
  {
    Login: Pages.Login,
    Webview: Pages.CustomWebView,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {},
  },
);

export default AuthStack;
