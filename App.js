import React from 'react';
import RootStack from './src/config/routes';
import NavigationService from './src/services/navigator';

export default class App extends React.Component {
  render() {
    return (
      <RootStack
        ref={(navigatorRef: any) => {
          NavigationService.setContainer(navigatorRef);
        }}
      />
    );
  }
}
