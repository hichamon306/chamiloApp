import React from 'react';
import { Root } from 'native-base';
import { useScreens } from 'react-native-screens';
import RootStack from './config/routes';
import NavigationService from './services/navigator';

useScreens();

export default class App extends React.Component {
  render() {
    return (
      <Root>
        <RootStack
          ref={(navigatorRef: any) => {
            NavigationService.setContainer(navigatorRef);
          }}
        />
      </Root>
    );
  }
}
