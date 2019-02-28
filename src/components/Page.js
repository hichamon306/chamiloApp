import React from 'react';
import {
  StyleProvider,
  Container,
  Content,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';
import Header from './Header';
import Footer from './Footer';

type PropsType = {
  children: any,
  headerProps: any,
  footerProps: any,
}

export default class Home extends React.Component<PropsType> {
  render() {
    const { headerProps, footerProps } = this.props;
    return (
      <StyleProvider style={getTheme(chamilo)}>
        <Container>
          {headerProps && <Header {...headerProps} />}
          <Content contentContainerStyle={{ flexGrow: 1 }}>
            {this.props.children}
          </Content>
          {footerProps && <Footer {...footerProps} />}
        </Container>
      </StyleProvider>
    );
  }
}
