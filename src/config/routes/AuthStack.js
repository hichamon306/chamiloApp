import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';

const AuthStack = createStackNavigator(
  {
    Login: Pages.Login,
  },
  {
    initialRouteName: 'Login',
    navigationOptions: {},
  },
);

export default AuthStack;
