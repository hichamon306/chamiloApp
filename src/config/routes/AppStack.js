import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';

const AppStack = createStackNavigator(
  {
    Home: Pages.Home,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {},
  },
);

export default AppStack;
