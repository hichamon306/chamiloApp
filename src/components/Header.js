// @flow
import React from 'react';
import {
  Header,
  Left,
  Right,
  Body,
  Thumbnail,
  StyleProvider,
} from 'native-base';
import headerLogo from '../../assets/logo-ceusi-transparent.png';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';

type PropsType = {
    left: any,
    body: any,
    right: any,
};

export default class CustomHeader extends React.Component<PropsType> {
  shouldComponentUpdate() {
    return false;
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
