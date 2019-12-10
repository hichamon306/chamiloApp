import React from 'react';
import { Root } from 'native-base';
import RootStack from './config/routes';
import NavigationService from './services/navigator';

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
