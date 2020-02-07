import React from 'react';
import { connect } from 'react-redux';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Badge,
  StyleProvider,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';
import { getCountUnreadMessages } from '../modules/messages';
import Text from './Text';

type PropsType = {
  navigation: any,
  unreadMessagesCount: number,
};

class CustomFooter extends React.Component<PropsType> {
  navigate(routeName: string) {
    const { navigation } = this.props;
    navigation.navigate(routeName);
  }

  shouldComponentUpdate(nextProps) {
    const currentIndex = this.props.navigation.state.index;
    const nextIndex = nextProps.navigation.state.index;
    if (currentIndex !== nextIndex) {
      return true;
    }
    if (this.props.unreadMessagesCount !== nextProps.unreadMessagesCount) {
      return true;
    }
    return false;
  }

  render() {
    // console.log(this.props);
    const { index } = this.props.navigation.state;
    const activeView = [
      false,
      false,
      false,
      false,
    ];
    activeView[index] = true;
    const { unreadMessagesCount } = this.props;
    return (
      <StyleProvider style={getTheme(chamilo)}>
        <Footer>
          <FooterTab>
            <Button
              active={activeView[0]}
              vertical
              onPress={() => this.navigate('Home')}
            >
              <Icon name="home" />
              <Text>home</Text>
            </Button>
            <Button onPress={() => this.navigate('Courses')} active={activeView[1]} vertical>
              <Icon name="book" />
              <Text>courses</Text>
            </Button>
            <Button onPress={() => this.navigate('Catalogue')} active={activeView[2]} vertical>
              <Icon name="school" />
              <Text>catalog</Text>
            </Button>
            <Button
              onPress={() => this.navigate('Messages')}
              active={activeView[3]}
              badge={unreadMessagesCount > 0}
              vertical
            >
              {unreadMessagesCount > 0
                && (
                  <Badge><Text>{unreadMessagesCount}</Text></Badge>
                )
              }
              <Icon name="mail" />
              <Text>messages</Text>
            </Button>
          </FooterTab>
        </Footer>
      </StyleProvider>
    );
  }
}

const mapStateToProps = state => ({
  unreadMessagesCount: getCountUnreadMessages(state),
});

export default connect(mapStateToProps)(CustomFooter);
