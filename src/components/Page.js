import React from 'react';
import { NavigationEvents } from 'react-navigation';
import {
  StyleProvider,
  Container,
  Content,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';

type PropsType = {
  children: any,
  headerProps: any,
  postHeader: any,
  postContent: any,
  padder?: boolean,
  contentContainerStyle: any,
  style: any,
  onWillFocus: ()=> void,
  onDidFocus: ()=> void,
  onWillBlur: ()=> void,
  onDidBlur: () => void,
}

export default class Page extends React.Component<PropsType> {
  static defaultProps = {
    padder: true,
  };

  render() {
    const { padder } = this.props;
    return (
      <StyleProvider style={getTheme(chamilo)}>
        <Container>
          {this.props.postHeader}
          <Content padder={padder} style={this.props.style} contentContainerStyle={this.props.contentContainerStyle}>
            {this.props.children}
          </Content>
          {this.props.postContent}
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
