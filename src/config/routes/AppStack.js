import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';

const AppStack = createStackNavigator(
  {
    Home: Pages.Home,
  },
  {
    initialRouteName: 'Home',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppStack;
