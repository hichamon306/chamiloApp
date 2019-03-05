import React from 'react';
import {
  StyleProvider,
  Container,
  Content,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';
import Header from './Header';

type PropsType = {
  children: any,
  headerProps: any,
  postHeader: any,
  contentContainerStyle: any,
}

export default class Page extends React.Component<PropsType> {
  render() {
    const { headerProps } = this.props;
    return (
      <StyleProvider style={getTheme(chamilo)}>
        <Container>
          {headerProps && <Header {...headerProps} />}
          {this.props.postHeader}
          <Content padder contentContainerStyle={this.props.contentContainerStyle}>
            {this.props.children}
          </Content>
        </Container>
      </StyleProvider>
    );
  }
}
