import React from 'react';
import {
  Footer,
  FooterTab,
  Button,
  Icon,
  Text,
  Badge,
  StyleProvider,
} from 'native-base';
import getTheme from '../../native-base-theme/components';
import chamilo from '../../native-base-theme/variables/chamilo';

type PropsType = {
  navigation: any,
};

export default class CustomFooter extends React.Component<PropsType> {
  navigate(routeName: string) {
    const { navigation } = this.props;
    navigation.navigate(routeName);
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
              <Text>Accueil</Text>
            </Button>
            <Button onPress={() => this.navigate('Courses')} active={activeView[1]} vertical>
              <Icon name="book" />
              <Text>Cours</Text>
            </Button>
            <Button onPress={() => this.navigate('Catalogue')} active={activeView[2]} vertical>
              <Icon name="school" />
              <Text>Catalogue</Text>
            </Button>
            <Button onPress={() => this.navigate('Messages')} active={activeView[3]} badge vertical>
              <Badge><Text>51</Text></Badge>
              <Icon active name="mail" />
              <Text>Messages</Text>
            </Button>
          </FooterTab>
        </Footer>
      </StyleProvider>
    );
  }
}
