import React from 'react';
import { NavigationEvents } from 'react-navigation';
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
  onWillFocus: ()=> void,
  onDidFocus: ()=> void,
  onWillBlur: ()=> void,
  onDidBlur: () => void,
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
          <NavigationEvents
            onWillFocus={this.props.onWillFocus}
            onDidFocus={this.props.onDidFocus}
            onWillBlur={this.props.onWillBlur}
            onDidBlur={this.props.onDidBlur}
          />
        </Container>
      </StyleProvider>
    );
  }
}
