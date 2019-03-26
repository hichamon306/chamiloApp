// @flow
import React from 'react';
import { connect } from 'react-redux';
import {
  Header,
  Left,
  Right,
  Body,
  Button,
  Icon,
  Thumbnail,
} from 'native-base';
import { Alert } from 'react-native';
import { logoutActionCreator } from '../modules/authentication';
import headerLogo from '../../assets/images/headerLogo.png';

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
      <Header {...this.props}>
        <Left>
          {this.props.left}
        </Left>
        <Body>
          {this.props.body
            || (
              <Thumbnail style={{ width: 224 }} resizeMode="contain" source={headerLogo} />
            )}
        </Body>
        <Right>
          <Button
            onPress={() => this.onLogout()}
            transparent
          >
            <Icon name="power" />
          </Button>
        </Right>
      </Header>
    );
  }
}

const mapDispatchToProps = ({
  logout: logoutActionCreator,
});
export default connect(null, mapDispatchToProps)(CustomHeader);
