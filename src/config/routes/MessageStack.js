import { createStackNavigator } from 'react-navigation';
import * as Pages from '../../pages';

const MessageStack = createStackNavigator(
  {
    MessagesReceived: Pages.MessagesReceived,
    MessagesSent: Pages.MessagesSent,
  },
  {
    initialRouteName: 'MessagesReceived',
    navigationOptions: {},
  },
);

export default MessageStack;
