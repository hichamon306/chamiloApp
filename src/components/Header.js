// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Left,
  Right,
  Body,
  Thumbnail,
  StyleProvider,
} from 'native-base';
import { Alert } from 'react-native';
import { logoutActionCreator } from '../modules/authentication';
import headerLogo from '../../assets/logo-ceusi-transparent.png';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';

type PropsType = {
    left: any,
    body: any,
    right: any,
    logout: () => void,
};

class CustomHeader extends React.Component<PropsType> {
  shouldComponentUpdate() {
    return false;
  }

  onLogout() {
    Alert.alert(
      'Information',
      'Attention vous êtes sur le point de vous déconnecter',
      [
        {
          text: 'Confirmer',
          onPress: () => this.props.logout(),
        },
        {
          text: 'Annuler',
          onPress: () => {},
          style: 'cancel',
        },
      ],
      { cancelable: false },
    );
  }

  render() {
    return (
      <StyleProvider style={getTheme(chamilo)}>
        <Header {...this.props}>
          <Left style={{ flex: 1 }}>
            {this.props.left}
          </Left>
          <Body style={{ flex: 1 }}>
            {this.props.body
              || (
                <Thumbnail style={{ alignSelf: 'center' }} large resizeMode="contain" source={headerLogo} />
              )}
          </Body>
          <Right style={{ flex: 1 }}>
            {this.props.right}
          </Right>
        </Header>
      </StyleProvider>
    );
  }
}

const mapDispatchToProps = ({
  logout: logoutActionCreator,
});
export default connect(null, mapDispatchToProps)(CustomHeader);
