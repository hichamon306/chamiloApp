import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';
import BottomTabBar from './BottomTabBar';

const AppStack = createStackNavigator(
  {
    TabBar: BottomTabBar,
    WebView: Pages.CustomWebView,
  },
  {
    initialRouteName: 'TabBar',
    headerMode: 'none',
    navigationOptions: {
      header: null,
    },
  },
);

export default AppStack;
