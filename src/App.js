import React from 'react';
import { Root } from 'native-base';
import { useScreens } from 'react-native-screens';
import { connect } from 'react-redux';
import { AppState } from 'react-native';
import RootStack from './config/routes';
import NavigationService from './services/navigator';
import { loadDataActionCreator } from './modules/dataLoader';

useScreens();
type StateType = {
  AppState: string,
};
type PropsType = {
  loadData: () => void,
};

class App extends React.Component<PropsType> {
  state: StateType;

  state = {
    appState: AppState.currentState,
  };

  componentDidMount() {
    AppState.addEventListener('change', this._handleAppStateChange);
  }

  componentWillUnmount() {
    AppState.removeEventListener('change', this._handleAppStateChange);
  }

  _handleAppStateChange = (nextAppState) => {
    if (
      this.state.appState.match(/inactive|background/) &&
      nextAppState === 'active'
    ) {
      // console.log('App has come to the foreground!');
      this.props.loadData();
    }
    this.setState({ appState: nextAppState });
  };

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

const mapDispatchToProps = ({
  loadData: loadDataActionCreator,
});
export default connect(null, mapDispatchToProps)(App);
